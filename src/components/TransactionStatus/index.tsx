import cn from 'classnames'

//styles
import styles from './TransactionStatus.module.scss'

//components
import CustomChip from '../CustomChip'

//types
import { TransactionStatuses } from '@/@types/enums'

type TTransactionStatusProps = {
    status: TransactionStatuses;
}

const successStatuses = [
    TransactionStatuses.PAID,
    TransactionStatuses.PAID_OVER,
    TransactionStatuses.REFUND_PAID,
];
const errorStatuses = [
    TransactionStatuses.WRONG_AMOUNT_WAITING,
    TransactionStatuses.WRONG_AMOUNT,
    TransactionStatuses.FAIL,
    TransactionStatuses.CANCEL,
    TransactionStatuses.SYSTEM_FAIL,
    TransactionStatuses.REFUND_FAIL,
    TransactionStatuses.LOCKED,
];
const warnStatuses = [
    TransactionStatuses.PROCESS,
    TransactionStatuses.CONFIRM_CHECK,
    TransactionStatuses.CONFIRMATIONS,
    TransactionStatuses.CHECK,
    TransactionStatuses.REFUND_PROCCESS,
];

const getStatusClassName = (status: TransactionStatuses) => {
    if (successStatuses.includes(status)) return styles.status__success;
    if (errorStatuses.includes(status)) return styles.status__error;
    if (warnStatuses.includes(status)) return styles.status__warn;
    return '';
};


const TransactionStatus: React.FC<TTransactionStatusProps> = ({ status }) => {
    return (
        <CustomChip className={cn(styles.status, getStatusClassName(status))} size='small' label={status} isActive={false} />
    )
}

export default TransactionStatus