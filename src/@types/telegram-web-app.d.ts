interface TelegramWebAppUser {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    is_premium: boolean;
}

interface TelegramWebApp {
    initData: string;
    expand: () => void;
    initDataUnsafe: {
        user: TelegramWebAppUser;
        query_id: string;
        auth_date: number;
        hash: string;
        signature: string;
    };
    platform: string;
}

interface Window {
    Telegram: {
        WebApp: TelegramWebApp;
    };
}