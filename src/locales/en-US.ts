export default {
  common: {
    add: 'Add',
    addSuccess: 'Add Success',
    edit: 'Edit',
    editSuccess: 'Edit Success',
    delete: 'Delete',
    deleteSuccess: 'Delete Success',
    save: 'Save',
    saveSuccess: 'Save Success',
    reset: 'Reset',
    action: 'Action',
    export: 'Export',
    exportSuccess: 'Export Success',
    import: 'Import',
    importSuccess: 'Import Success',
    clear: 'Clear',
    clearSuccess: 'Clear Success',
    yes: 'Yes',
    no: 'No',
    confirm: 'Confirm',
    download: 'Download',
    username: "Username",
    noData: 'No Data',
    wrong: 'Something went wrong, please try again later.',
    success: 'Success',
    failed: 'Failed',
    verify: 'Verify',
    unauthorizedTips: 'Unauthorized, please verify first.',
    productName: 'SmartChat',
    userSettings: 'User Settings',
    gptSettings: 'GPT Settings',
    gptSettingsDesc: 'Set up your OpenAI API Key to get started',
    avatar: 'Avatar',
    change: 'Change',
    name: 'Name',
    apiKey: 'API KEY',
    show: 'Show',
    hide: 'Hide',
    getApiKey: 'To get your ApiKey from OpenAi click here',
    gptModel: 'Model',
    subscribe: 'Subscribe',
    personal: 'Personal',
    team: 'Team',
    sysBaseSettings: 'System Settings',
    theme: 'Theme',
    white: 'White',
    dark: 'Dark',
    language: 'Language',
    requestTimeout: 'Request Timeout',
    s: 'S',
    socksProxy: 'Socks Proxy',
    httpsProxy: 'Https Proxy',
    use: 'Use',
    close: 'Close',
    support: 'Support',
    login: 'Sign IN',
    logout: 'Sign Out',
    chat: 'Chat',
    user: 'User',
    settings: 'Settings',
    chats: 'Chats',
    search: 'Search',
    send: 'Send',
    app: 'App',
    members: 'Members',
    apps: 'Apps',
    upgrade: 'Upgrade',
    signin: 'Sign In',
    signup: 'Sign UP',
    signout: 'Sign Out',
    haveAccount: 'Already have an account?',
    dontHaveAccount: 'Don’t have an account yet? Sign up',
    pricingPlans: 'Pricing Plans',
    included: "What's included",
    select: 'Buy',
    email: 'Email',
    usingContext: "Using context",
    contextCount: "Using context count",
    temperature: "Temperature",
    presencePenalty: "Presence penalty",
    frequencyPenalty: "Frequency penalty",
    create: "Create",
    activationCode: "Activation Code",
    useActivationCode: "Use activation code",
    activation: "Activation",
    activationCodeDocs: "Please enter your activation code, and then click the activation button below to redeem, if you do not have an activation code, please click here to buy",
    currentPackage: "Current Package",
    contextCountDesc: "The maximum number of historical messages carried each time a dialog is requested, ranging from 0-20",
    temperatureDesc: "For transformation tasks (extraction, standardization, format conversion, grammar fixes) prefer a temperature of 0 or up to 0.3. <br />For writing tasks, you should juice the temperature higher, closer to 0.5. <br />If you want GPT to be highly creative (for marketing or advertising copy for instance), consider values between 0.7 and 1.",
    presencePenaltyDesc: "The presence penalty parameter encourages the model to make novel predictions.<br />The presence penalty lowers the probability of a word if it already appeared in the predicted text.",
    frequencyPenaltyDesc: "The frequency penalty parameter controls the model’s tendency to repeat predictions. <br />The frequency penalty reduces the probability of words that have already been generated. <br />The penalty depends on how many times a word has already occurred in the prediction.",
    free: "Free"
  },
  chat: {
    placeholder: 'Ask me anything...(Shift + Enter = line break)',
    placeholderMobile: 'Ask me anything...',
    copy: 'Copy',
    copied: 'Copied',
    copyCode: 'Copy Code',
    clearChat: 'Clear Chat',
    clearChatConfirm: 'Are you sure to clear this chat?',
    exportImage: 'Export Image',
    exportImageConfirm: 'Are you sure to export this chat to png?',
    exportSuccess: 'Export Success',
    exportFailed: 'Export Failed',
    usingContext: 'Context Mode',
    turnOnContext: 'In the current mode, sending messages will carry previous chat records.',
    turnOffContext: 'In the current mode, sending messages will not carry previous chat records.',
    deleteMessage: 'Delete Message',
    deleteMessageConfirm: 'Are you sure to delete this message?',
    deleteHistoryConfirm: 'Are you sure to clear this history?',
    clearHistoryConfirm: 'Are you sure to clear chat history?',
    StopResponding: 'Stop Responding',
  },
  setting: {
    setting: 'Setting',
    general: 'General',
    config: 'Config',
    avatarLink: 'Avatar Link',
    name: 'Name',
    description: 'Description',
    resetUserInfo: 'Reset UserInfo',
    chatHistory: 'ChatHistory',
    theme: 'Theme',
    language: 'Language',
    api: 'API',
    reverseProxy: 'Reverse Proxy',
    timeout: 'Timeout',
    socks: 'Socks',
    httpsProxy: 'HTTPS Proxy',
  },
  store: {
    local: 'Local',
    online: 'Online',
    title: 'Title',
    description: 'Description',
    clearStoreConfirm: 'Whether to clear the data?',
    importPlaceholder: 'Please paste the JSON data here',
    addRepeatTitleTips: 'Title duplicate, please re-enter',
    addRepeatContentTips: 'Content duplicate: {msg}, please re-enter',
    editRepeatTitleTips: 'Title conflict, please revise',
    editRepeatContentTips: 'Content conflict {msg} , please re-modify',
    importError: 'Key value mismatch',
    importRepeatTitle: 'Title repeatedly skipped: {msg}',
    importRepeatContent: 'Content is repeatedly skipped: {msg}',
    onlineImportWarning: 'Note: Please check the JSON file source!',
    downloadError: 'Please check the network status and JSON file validity',
  },
}
