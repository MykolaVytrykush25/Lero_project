import { capitalize, Fade, Modal } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useToast } from "../ToastProvider";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Image from "next/image";

//styles
import styles from "./AddOfferModal.module.scss";

//components
import ModalHead from "../ModalHead";
import GrayContainedButton from "../GrayContainedButton";
import ProductItem from "../ProductComponents/ProductItem";
import AddOfferPriceItem from "../AddOfferPriceItem";
import CustomChip from "../CustomChip";
import CustomTextField from "../CustomTextField";
import CustomSelect from "../CustomSelect";
import ErrorButton from "../ErrorButton";

//icons
import { Add, DeleteOutline } from "@mui/icons-material";

//API
import {
  createProduct,
  getProductCategories,
  getProductTypes,
  getTags,
  uploadProductPhoto,
} from "@/API/productsService";

//redux
import { userSelector } from "@/redux/slices/user/selectors";

//types
import { ProductTypes } from "@/@types/enums";
import { TProductTag } from "@/redux/slices/products/types";
import { TModalProps, TSelectData } from "@/@types/base";

const AddOfferModal: React.FC<TModalProps> = ({ isOpened, handleClose }) => {
  const { t } = useTranslation("common");
  const { showToast } = useToast();
  const { userData } = useSelector(userSelector);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [shortDescription, setShortDescription] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const [typesList, setTypesList] = useState<TSelectData[]>([]);
  const [categoriesList, setCategoriesList] = useState<TSelectData[]>([]);
  const [tagsList, setTagsList] = useState<TProductTag[]>([]);

  const [fixedPrice, setFixedPrice] = useState(0);
  const [offerPriceItems, setOfferPriceItems] = useState<{ price: number; amount: number }[]>([]);

  const handleAddPriceItem = () => {
    setOfferPriceItems([...offerPriceItems, { price: 0, amount: 1 }]);
  };

  const handleRemovePriceItem = (index: number) => {
    setOfferPriceItems(offerPriceItems.filter((_, idx) => idx !== index));
  };

  const handleFixedPriceChange = (newPrice: number) => {
    setFixedPrice(newPrice);
  };

  const handlePriceChange = (index: number, newPrice: number) => {
    const updatedItems = [...offerPriceItems];
    updatedItems[index].price = newPrice;
    setOfferPriceItems(updatedItems);
  };

  const handleAmountChange = (index: number, newAmount: number) => {
    const updatedItems = [...offerPriceItems];
    updatedItems[index].amount = newAmount;
    setOfferPriceItems(updatedItems);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageReset = () => {
    setImage(null);
    setImageFile(null);
  };

  const resetForm = () => {
    setImage(null);
    setImageFile(null);
    setTitle("");
    setShortDescription("");
    setDescription("");
    setType("");
    setCategory("");
    setSelectedTags([]);
    setFixedPrice(0);
    setOfferPriceItems([]);
  };

  const handleSubmit = async () => {
    const hasInvalidOfferPrice = offerPriceItems?.some(
      (item) => item?.price === undefined || item.price <= 0 || item.amount <= 0
    );

    const hasInvalidPriceSequence = offerPriceItems?.some((item, index) => {
      if (index > 0) {
        const previousItem = offerPriceItems[index - 1];
        return item.price >= previousItem.price;
      }
      return false;
    });

    const hasInvalidAmountSequence = offerPriceItems?.some((item, index) => {
      if (index > 0) {
        const previousItem = offerPriceItems[index - 1];
        return item.amount <= previousItem.amount;
      }
      return false;
    });

    if (!title || !description || !shortDescription || !type || !category) {
      showToast("All fields are required", "error");
      return;
    }

    if (!imageFile) {
      showToast("Upload image is required", "error");
      return;
    }

    if (selectedTags?.length < 2) {
      showToast("Please select at least two tags", "error");
      return;
    }

    if (fixedPrice <= 0 || hasInvalidOfferPrice) {
      showToast("All offer prices and amounts must be greater than zero", "error");
      return;
    }

    if (hasInvalidPriceSequence) {
      showToast("Price should not be greater than or equal to the previous price", "error");
      return;
    }

    if (hasInvalidAmountSequence) {
      showToast("Amount should not be less than or equal to the previous amount", "error");
      return;
    }

    setIsLoading(true);
    try {
      const data = await createProduct({
        title,
        short_description: shortDescription,
        description,
        in_stock: 0,
        type,
        category,
        tags: selectedTags,
        prices: [
          { price: fixedPrice, amount: "1" },
          ...offerPriceItems.map((item) => ({
            price: item.price,
            amount: item.amount.toString(),
          })),
        ],
      });

      await uploadProductPhoto(data?.id, imageFile);

      handleClose();
      resetForm();
    } catch (err: any) {
      showToast(err?.response?.data?.message || t("base.defaultError"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTag = (val: number) => {
    setSelectedTags((prevActiveTags) =>
      prevActiveTags.includes(val)
        ? prevActiveTags.filter((tag) => tag !== val)
        : [...prevActiveTags, val]
    );
  };

  useEffect(() => {
    if (isOpened) {
      (async () => {
        const data = await getProductTypes();
        setTypesList(data.map((i: string) => ({ label: capitalize(i), value: i })));
      })();
    }
  }, [isOpened]);

  useEffect(() => {
    if (type) {
      setCategory("");
      (async () => {
        const [tagsData, categoryData] = await Promise.all([
          getTags({ type: type as ProductTypes }),
          getProductCategories(type),
        ]);

        if (categoryData.length > 0) {
          setCategoriesList(
            categoryData.map((i: { name: string; id: number }) => ({ label: i.name, value: i.id }))
          );
        }

        setTagsList(tagsData);
      })();
    }
  }, [type]);

  return (
    <Modal open={isOpened} onClose={handleClose}>
      <Fade in={isOpened}>
        <div className={styles.modal}>
          <div className={styles.modal__wrapper}>
            <ModalHead handleClose={handleClose} heading="Add Offer" />
            <div className={styles.modal__main}>
              <div className={styles.modal__main__info}>
                <h3>Info</h3>
                <div className={styles.modal__main__info__wrapper}>
                  <div className={styles.modal__main__info__upload}>
                    <div className={styles.modal__main__info__upload__wrapper}>
                      <div className={styles.modal__main__info__upload__main}>
                        <Image
                          className={styles.modal__main__info__upload__main__image}
                          src={image || "/avatar.png"}
                          width={512}
                          height={512}
                          alt="product"
                        />
                        <div className={styles.modal__main__info__upload__main__text}>
                          <h3>Change Image</h3>
                          <p>
                            <span onClick={() => imageInputRef.current?.click()}>Upload file</span>{" "}
                            max 5mb
                          </p>
                        </div>
                        <input
                          ref={imageInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: "none" }}
                        />
                      </div>
                      {image && (
                        <ErrorButton onClick={handleImageReset}>
                          <DeleteOutline />
                        </ErrorButton>
                      )}
                    </div>
                  </div>
                  <CustomTextField
                    value={title}
                    inputProps={{ maxLength: 80 }}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Title"
                    type="text"
                    fullWidth
                  />
                  <CustomTextField
                    value={shortDescription}
                    inputProps={{ maxLength: 80 }}
                    onChange={(e) => setShortDescription(e.target.value)}
                    label="Short Description"
                    multiline
                    minRows={1}
                    maxRows={3}
                    type="text"
                    fullWidth
                  />
                  <CustomTextField
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    label="Description"
                    multiline
                    minRows={3}
                    maxRows={7}
                    type="text"
                    fullWidth
                  />
                  <CustomSelect
                    data={typesList}
                    value={type}
                    setValue={setType}
                    placeholder="Type"
                  />
                  <CustomSelect
                    data={categoriesList}
                    value={category}
                    setValue={setCategory}
                    placeholder="Category"
                    disabled={!type}
                  />
                  <div className={styles.modal__main__info__prices}>
                    <AddOfferPriceItem
                      onAmountChange={() => {}}
                      price={fixedPrice}
                      amount={1}
                      readOnly
                      onPriceChange={handleFixedPriceChange}
                    />
                    {offerPriceItems.map((item, idx) => (
                      <AddOfferPriceItem
                        key={idx}
                        price={item.price}
                        amount={item.amount}
                        onPriceChange={(newPrice) => handlePriceChange(idx, newPrice)}
                        onAmountChange={(newAmount) => handleAmountChange(idx, newAmount)}
                        onRemove={() => handleRemovePriceItem(idx)}
                      />
                    ))}
                    <GrayContainedButton
                      disabled={offerPriceItems.length >= 6}
                      onClick={handleAddPriceItem}
                    >
                      <Add /> Add More Amount
                    </GrayContainedButton>
                  </div>
                  {tagsList.length > 0 && (
                    <div className={styles.modal__main__info__tags}>
                      <div className={styles.modal__main__info__tags__wrapper}>
                        <div className={styles.modal__main__info__tags__head}>
                          <h4>Tags</h4>
                          <p>Min 2 Tags</p>
                        </div>
                        <div className={styles.modal__main__info__tags__main}>
                          <div className={styles.modal__main__info__tags__main__wrapper}>
                            {tagsList.map((t, idx) => (
                              <CustomChip
                                isActive={selectedTags.includes(t.id)}
                                onClick={() => handleSelectTag(t.id)}
                                label={t.name}
                                key={idx}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.modal__main__preview}>
                <h3>Preview</h3>
                <ProductItem
                  id={0}
                  rating={5}
                  price={fixedPrice}
                  description={shortDescription || "Short description"}
                  shopName={userData?.username as string}
                  title={title || "Gemups Product"}
                  imageUrl={image || "/avatar.png"}
                  category="new"
                  isVerified={true}
                  countSellers={0}
                  piecesLeft={0}
                  tags={[{ id: 0, name: "Gemups" }]}
                  variant="view"
                />
              </div>
            </div>
            <div className={styles.modal__actions}>
              <GrayContainedButton fullWidth onClick={handleClose}>
                Cancel
              </GrayContainedButton>
              <LoadingButton
                onClick={handleSubmit}
                loading={isLoading}
                fullWidth
                variant="contained"
                color="primary"
              >
                Add offer
              </LoadingButton>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddOfferModal;
