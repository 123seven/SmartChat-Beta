export default {
  common: {
    add: '新增',
    addSuccess: '新增成功',
    edit: '編輯',
    editSuccess: '編輯成功',
    delete: '刪除',
    deleteSuccess: '刪除成功',
    save: '儲存',
    saveSuccess: '儲存成功',
    reset: '重設',
    action: '操作',
    export: '匯出',
    exportSuccess: '匯出成功',
    import: '匯入',
    importSuccess: '匯入成功',
    clear: '清除',
    clearSuccess: '清除成功',
    yes: '是',
    no: '否',
    confirm: '確認',
    download: '下載',
    username: '用戶名',
    noData: '目前無資料',
    wrong: '發生錯誤，請稍後再試。',
    success: '操作成功',
    failed: '操作失敗',
    verify: '驗證',
    unauthorizedTips: '未經授權，請先進行驗證。',
    productName: 'SmartChat',
    userSettings: '用戶設定',
    gptSettings: 'GPT設定',
    gptSettingsDesc: '設置您的OpenAI API Key開始使用',
    avatar: '頭像',
    change: '更換',
    name: '名稱',
    apiKey: 'API KEY',
    show: '顯示',
    hide: '隱藏',
    getApiKey: '從OpenAi獲取您的ApiKey請點擊此處',
    gptModel: '模型',
    subscribe: '訂閱',
    personal: '個人',
    team: '團隊',
    sysBaseSettings: '系統設定',
    theme: '主題',
    white: '淺色',
    dark: '深色',
    language: '語言',
    requestTimeout: '請求超時',
    s: '秒',
    socksProxy: 'Socks代理',
    httpsProxy: 'Https代理',
    use: '使用',
    close: '關閉',
    support: '支援',
    login: '登錄',
    logout: '退出',
    chat: '聊天',
    user: '用戶',
    settings: '設定',
    chats: '對話記錄',
    search: '搜索',
    send: '發送',
    app: '应用',
    members: '團隊',
    apps: '應用',
    upgrade: '升級',
    signin:'登錄',
    signup:'註冊',
    signout:'退出',
    haveAccount:'已有帳戶？點擊去登錄',
    dontHaveAccount :'還沒有賬戶？點擊去註冊',
    pricingPlans: '定價計劃',
    included: '包含',
    select: "選擇",
    email: "郵箱",
    usingContext: "使用歷史消息",
    contextCount: "攜帶歷史消息數",
    temperature: "回复隨機性",
    presencePenalty: "話題新鮮度",
    frequencyPenalty: "對話可理解性",
    create: "新建",
    activationCode: "激活碼",
    useActivationCode: "激活碼激活",
    activation: "激活",
    activationCodeDocs: "請輸入的你激活碼，然後點擊下面的激活按鈕即可兌換，如果你沒有激活碼，請點擊此處去購買",
    currentPackage: "當前套餐",
    contextCountDesc: "每次請求對話時攜帶的最大歷史消息數，範圍0-20",
    temperatureDesc: "對於轉換任務（提取、標準化、格式轉換、語法修復），首選溫度為 0 或最高 0.3。 <br />對於寫作任務，您應該將溫度調高一些，接近 0.5。 <br />如果您希望 GPT 具有高度創造性（例如用於營銷或廣告文案），請考慮 0.7 到 1 之間的值。",
    presencePenaltyDesc: "存在懲罰參數鼓勵模型做出新穎的預測。 <br />如果某個詞已經出現在預測文本中，則存在懲罰會降低該詞的概率。 <br />較高的值，模型會更多地推薦新的內容。",
    frequencyPenaltyDesc: "頻率懲罰參數控制模型重複預測的趨勢。 <br />頻率懲罰降低了已經生成單詞的概率。懲罰取決於一個詞在預測中已經出現了多少次。 <br />較高的值，模型的回復會更加多樣。",
    free: "免費",
    signWithGoogle: "Google賬號登錄",
    signWithGithub: "Github賬號登錄",
    changeAvatarDosc: "請輸入圖像鏈接",
    beta: "體驗版"
  },
  chat: {
    placeholder: '來說點什麼...（Shift + Enter = 換行）',
    placeholderMobile: '來說點什麼...',
    copy: '複製',
    copied: '複製成功',
    copyCode: '複製代碼',
    clearChat: '清除對話',
    clearChatConfirm: '是否清空對話?',
    exportImage: '儲存對話為圖片',
    exportImageConfirm: '是否將對話儲存為圖片?',
    exportSuccess: '儲存成功',
    exportFailed: '儲存失敗',
    usingContext: '上下文模式',
    turnOnContext: '啟用上下文模式，在此模式下，發送訊息會包含之前的聊天記錄。',
    turnOffContext:
      '關閉上下文模式，在此模式下，發送訊息不會包含之前的聊天記錄。',
    deleteMessage: '刪除訊息',
    deleteMessageConfirm: '是否刪除此訊息?',
    deleteHistoryConfirm: '確定刪除此紀錄?',
    clearHistoryConfirm: '確定清除紀錄?',
    StopResponding: '停止回應',
  },
  setting: {
    setting: '設定',
    general: '總覽',
    config: '設定',
    avatarLink: '頭貼連結',
    name: '名稱',
    description: '描述',
    resetUserInfo: '重設使用者資訊',
    chatHistory: '紀錄',
    theme: '主題',
    language: '語言',
    api: 'API',
    reverseProxy: '反向代理',
    timeout: '逾時',
    socks: 'Socks',
    httpsProxy: 'HTTPS Proxy',
  },
  store: {
    local: '本機',
    online: '線上',
    title: '標題',
    description: '描述',
    clearStoreConfirm: '是否清除資料？',
    importPlaceholder: '請將 JSON 資料貼在此處',
    addRepeatTitleTips: '標題重複，請重新輸入',
    addRepeatContentTips: '內容重複：{msg}，請重新輸入',
    editRepeatTitleTips: '標題衝突，請重新修改',
    editRepeatContentTips: '內容衝突{msg} ，請重新修改',
    importError: '鍵值不符合',
    importRepeatTitle: '因標題重複跳過：{msg}',
    importRepeatContent: '因內容重複跳過：{msg}',
    onlineImportWarning: '注意：請檢查 JSON 檔案來源！',
    downloadError: '請檢查網路狀態與 JSON 檔案有效性',
  },
}
