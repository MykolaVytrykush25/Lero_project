"use client";

import ScrollContainer from "react-indiana-drag-scroll";
import { useEffect, useState } from "react";

//styles
import styles from "./Tags.module.scss";

//components
import CustomChip from "../CustomChip";
import GrayContainedButton from "../GrayContainedButton";
import AccountFiltersWindow from "../ProductComponents/ProductFiltersWindow";

//API
import { getTags } from "@/API/productsService";

//types
import { ProductTypes } from "@/@types/enums";
import { TProductTag } from "@/redux/slices/products/types";


type TTagsProps = {
  type: ProductTypes
  activeTags: number[];
  setActiveTags: React.Dispatch<React.SetStateAction<number[]>>;
};

const Tags: React.FC<TTagsProps> = ({ type, activeTags, setActiveTags }) => {
  const [tags, setTags] = useState<TProductTag[]>([]);


  const [isFiltersOpened, setIsFiltersOpened] = useState<boolean>(false);

  const handleSelectTag = (val: number) => {
    setActiveTags((prevActiveTags) =>
      prevActiveTags.includes(val)
        ? prevActiveTags.filter((tag) => tag !== val)
        : [...prevActiveTags, val]
    );
  };

  useEffect(() => {
    (async () => {
      const data = await getTags({ type });
      setTags(data);
    })();
  }, []);

  return (
    <div className={styles.tags}>
      <ScrollContainer className={styles.tags__list}>
        {tags.map((t, idx) => (
          <CustomChip
            isActive={activeTags.includes(t.id)}
            key={idx}
            label={t.name}
            onClick={() => handleSelectTag(t.id)}
          />
        ))}
      </ScrollContainer>
      <GrayContainedButton rounded size="small" onClick={() => setIsFiltersOpened(true)}>
        See all
      </GrayContainedButton>
      <AccountFiltersWindow
        tags={tags}
        handleSelectTag={handleSelectTag}
        isOpened={isFiltersOpened}
        handleClose={() => setIsFiltersOpened(false)}
        activeTags={activeTags}
      />
    </div>
  );
};

export default Tags;
