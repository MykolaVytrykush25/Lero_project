//styles
import styles from './UserDescription.module.scss'

//components
import Block from '@/components/Block';

type TUserDescriptionProps = {
    description?: string;
}

const UserDescription: React.FC<TUserDescriptionProps> = ({ description }) => {
    return (
        <Block className={styles.desc}>
            <h4>Description</h4>
            <p>{description || 'This tab was supposed to have a description, but it seems to have taken a coffee break!'}</p>
        </Block>
    )
}

export default UserDescription