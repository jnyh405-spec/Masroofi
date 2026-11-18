// Masroofi - Personal Finance Manager
// Vanilla JS + LocalStorage + Chart.js

const STORAGE_KEYS = {
  transactions: 'masroofi_transactions',
  budget: 'masroofi_budget',
  goals: 'masroofi_goals',
  settings: 'masroofi_settings',
  initialized: 'masroofi_initialized'
};

const CATEGORIES = {
  income: ['salary', 'bonuses', 'other'],
  expense: ['food', 'shopping', 'transportation', 'study', 'bills', 'health', 'entertainment', 'other']
};

const i18n = {
  ar: {
    brand_sub: 'مصروفي', slogan: 'نظّم أموالك، واصنع مستقبلك.',
    nav_dashboard: 'لوحة التحكم', nav_transactions: 'المعاملات', nav_budget: 'الميزانية', nav_savings: 'أهداف الادخار', nav_analytics: 'التحليلات', nav_settings: 'الإعدادات',
    hero_label: 'إدارتك المالية تبدأ من هنا',
    hero_title: 'فلوسك تستاهل إدارة أذكى!',
    hero_desc: 'افهم مصروفاتك، نظّم ميزانيتك، وقرّب أهدافك المالية خطوة بخطوة. مع مصروفي، صار بإمكانك متابعة دخلك ومصروفاتك، واكتشاف أين تذهب أموالك، والتخطيط لمستقبل مالي أكثر تنظيمًا.',
    hero_feat1: 'تابع مصروفاتك بذكاء.',
    hero_feat2: 'تحكّم في ميزانيتك.',
    hero_feat3: 'اقترب من أهدافك المالية.',
    hero_btn_add: 'أضف معاملة جديدة',
    hero_btn_explore: 'استكشف تحليلاتك',
    welcome: 'مرحباً بك في مصروفي', welcome_sub: 'تابع دخلك ومصروفاتك وحقق أهدافك المالية',
    total_balance: 'الرصيد الإجمالي', total_income: 'إجمالي الدخل', total_expenses: 'إجمالي المصروفات', remaining_budget: 'الميزانية المتبقية',
    income_vs_expenses: 'الدخل مقابل المصروفات', expense_distribution: 'توزيع المصروفات حسب التصنيف',
    recent_transactions: 'آخر المعاملات', view_all: 'عرض الكل', budget_summary: 'ملخص الميزانية الشهرية', savings_summary: 'ملخص أهداف الادخار',
    transactions_sub: 'إدارة جميع الدخل والمصروفات', add_transaction: 'إضافة معاملة', edit_transaction: 'تعديل المعاملة',
    export_csv: 'تصدير CSV', print_report: 'طباعة التقرير', search_placeholder: 'بحث عن معاملة...',
    all_types: 'كل الأنواع', income: 'دخل', expense: 'مصروف', all_categories: 'كل التصنيفات', clear_filters: 'مسح الفلاتر',
    date: 'التاريخ', name: 'الاسم', type: 'النوع', category: 'التصنيف', amount: 'المبلغ', notes: 'ملاحظات', actions: 'إجراءات',
    no_transactions: 'لا توجد معاملات بعد', no_data: 'لا توجد بيانات',
    budget_sub: 'حدد ميزانيتك الشهرية وتابع استهلاكك', set_budget: 'تحديد الميزانية الشهرية', monthly_budget: 'الميزانية الشهرية',
    save_budget: 'حفظ الميزانية', budget_status: 'حالة الميزانية', spent: 'المصروف', remaining: 'المتبقي', no_budget: 'لم يتم تحديد ميزانية بعد',
    budget_ok: 'أنت ضمن الميزانية.', budget_warn: 'اقتربت من تجاوز الميزانية.', budget_over: 'لقد تجاوزت الميزانية!',
    savings_sub: 'خطط لأهدافك وحققها خطوة بخطوة', add_goal: 'إضافة هدف', edit_goal: 'تعديل الهدف', goal_name: 'اسم الهدف',
    target_amount: 'المبلغ المستهدف', saved_amount: 'المبلغ المدخر حاليًا', target_date: 'التاريخ المستهدف (اختياري)', no_goals: 'لا توجد أهداف ادخار بعد',
    progress: 'التقدم', add_saving: 'إضافة مبلغ', save: 'حفظ', cancel: 'إلغاء', delete: 'حذف', edit: 'تعديل', confirm: 'تأكيد',
    analytics_sub: 'نظرة أعمق على وضعك المالي', net_difference: 'صافي الفرق', top_category: 'أكثر التصنيفات إنفاقًا', monthly_expenses: 'تحليل المصروفات حسب الشهر',
    filter_month: 'الشهر', settings_sub: 'خصص تجربتك في مصروفي', language: 'اللغة', theme: 'المظهر', light_mode: 'فاتح', dark_mode: 'داكن',
    currency: 'العملة', currency_hint: 'يتم تغيير رمز العملة فقط دون تحويل الأسعار.', data_management: 'إدارة البيانات',
    reset_demo: 'إعادة تعيين البيانات التجريبية', delete_all: 'حذف جميع البيانات',
    msg_added: 'تمت الإضافة بنجاح', msg_updated: 'تم التحديث بنجاح', msg_deleted: 'تم الحذف بنجاح', msg_saved: 'تم الحفظ بنجاح',
    msg_exported: 'تم تصدير الملف', msg_reset: 'تمت إعادة تعيين البيانات التجريبية', msg_cleared: 'تم حذف جميع البيانات',
    confirm_delete_tx: 'هل أنت متأكد من حذف هذه المعاملة؟', confirm_delete_goal: 'هل أنت متأكد من حذف هذا الهدف؟',
    confirm_delete_all: 'هل أنت متأكد من حذف جميع البيانات؟ لا يمكن التراجع.', confirm_reset: 'هل تريد إعادة تعيين البيانات التجريبية؟',
    invalid_amount: 'يرجى إدخال مبلغ صحيح أكبر من صفر.', required_fields: 'يرجى تعبئة جميع الحقول المطلوبة.',
    enter_amount: 'أدخل المبلغ المراد إضافته', invalid_saved: 'قيمة غير صحيحة', budget_saved: 'تم حفظ الميزانية',
    cat_food: 'الطعام', cat_shopping: 'التسوق', cat_transportation: 'المواصلات', cat_study: 'الدراسة', cat_bills: 'الفواتير',
    cat_health: 'الصحة', cat_entertainment: 'الترفيه', cat_salary: 'الراتب', cat_bonuses: 'المكافآت', cat_other: 'أخرى',
    no_recent: 'لا توجد معاملات حديثة', no_expense_data: 'لا توجد مصروفات لعرضها',
    nav_about: 'من نحن', nav_services: 'خدماتنا', nav_contact: 'تواصل معنا',
    about_sub: 'تعرف على مشروع مصروفي ورؤيتنا وأهدافنا',
    about_project_name: 'مصروفي Masroofi',
    about_tagline: 'منصة ذكية لإدارة الأموال الشخصية',
    about_desc: 'مصروفي منصة ذكية لإدارة الأموال الشخصية، تهدف إلى مساعدة المستخدمين على تنظيم ميزانياتهم ومتابعة دخلهم ومصروفاتهم وتحقيق أهدافهم المالية بطريقة سهلة وفعالة.',
    about_vision_title: 'رؤيتنا',
    about_vision_text: 'أن نكون المنصة الموثوقة التي تساعد الأفراد على بناء وعي مالي أفضل واتخاذ قرارات مالية أكثر وضوحًا وثقة.',
    about_goals_title: 'أهدافنا',
    about_goal1: 'تبسيط متابعة الدخل والمصروفات اليومية.',
    about_goal2: 'مساعدة المستخدمين على الالتزام بالميزانية وتحقيق أهداف الادخار.',
    about_goal3: 'تقديم تحليلات واضحة تدعم التخطيط المالي الذكي.',
    services_sub: 'حلول عملية لمساعدتك على إدارة أموالك بفعالية',
    service_budget_title: 'إدارة الميزانية',
    service_budget_desc: 'مساعدة المستخدم على تنظيم دخله وتوزيع ميزانيته الشهرية والتحكم في مصروفاته.',
    service_analysis_title: 'تحليل المصروفات',
    service_analysis_desc: 'تقديم تحليلات ورسوم بيانية توضح المصروفات وتصنيفاتها وتساعد المستخدم على فهم عاداته المالية.',
    service_savings_title: 'التخطيط للادخار',
    service_savings_desc: 'مساعدة المستخدم على إنشاء أهداف ادخار ومتابعة المبالغ المدخرة ونسبة التقدم نحو تحقيق أهدافه.',
    contact_sub: 'يسعدنا تواصلك معنا لأي استفسار أو ملاحظة',
    contact_info_title: 'معلومات التواصل',
    contact_activity_label: 'اسم النشاط:',
    contact_activity_name: 'مصروفي',
    contact_whatsapp_label: 'رقم واتساب:',
    contact_address_label: 'العنوان:',
    contact_address_value: 'منصة مصروفي لإدارة الأموال الشخصية',
    contact_whatsapp_btn: 'تواصل معنا عبر واتساب',
    contact_form_title: 'أرسل رسالة',
    contact_name: 'الاسم',
    contact_name_ph: 'أدخل اسمك',
    contact_email: 'البريد الإلكتروني',
    contact_email_ph: 'example@email.com',
    contact_message: 'الرسالة',
    contact_message_ph: 'اكتب رسالتك هنا',
    contact_send: 'إرسال الرسالة',
    contact_err_required: 'يرجى تعبئة جميع الحقول المطلوبة.',
    contact_err_email: 'يرجى إدخال بريد إلكتروني صحيح.',
    contact_success: 'تم استلام رسالتك بنجاح، سنقوم بالتواصل معك قريبًا.'
  },
  en: {
    brand_sub: 'Masroofi', slogan: 'Manage Your Money, Shape Your Future.',
    nav_dashboard: 'Dashboard', nav_transactions: 'Transactions', nav_budget: 'Budget', nav_savings: 'Savings Goals', nav_analytics: 'Analytics', nav_settings: 'Settings',
    hero_label: 'YOUR FINANCIAL JOURNEY STARTS HERE',
    hero_title: 'Make Your Money Work Smarter!',
    hero_desc: 'Understand your spending, organize your budget, and get closer to your financial goals. Masroofi helps you track your income and expenses, discover where your money goes, and plan a more organized financial future.',
    hero_feat1: 'Track Your Spending.',
    hero_feat2: 'Manage Your Budget.',
    hero_feat3: 'Reach Your Goals.',
    hero_btn_add: 'Add New Transaction',
    hero_btn_explore: 'Explore Analytics',
    welcome: 'Welcome to Masroofi', welcome_sub: 'Track your income, expenses, and reach your financial goals',
    total_balance: 'Total Balance', total_income: 'Total Income', total_expenses: 'Total Expenses', remaining_budget: 'Remaining Budget',
    income_vs_expenses: 'Income vs Expenses', expense_distribution: 'Expenses by Category',
    recent_transactions: 'Recent Transactions', view_all: 'View All', budget_summary: 'Monthly Budget Summary', savings_summary: 'Savings Goals Summary',
    transactions_sub: 'Manage all your income and expenses', add_transaction: 'Add Transaction', edit_transaction: 'Edit Transaction',
    export_csv: 'Export CSV', print_report: 'Print Report', search_placeholder: 'Search transactions...',
    all_types: 'All Types', income: 'Income', expense: 'Expense', all_categories: 'All Categories', clear_filters: 'Clear Filters',
    date: 'Date', name: 'Name', type: 'Type', category: 'Category', amount: 'Amount', notes: 'Notes', actions: 'Actions',
    no_transactions: 'No transactions yet', no_data: 'No data available',
    budget_sub: 'Set your monthly budget and track spending', set_budget: 'Set Monthly Budget', monthly_budget: 'Monthly Budget',
    save_budget: 'Save Budget', budget_status: 'Budget Status', spent: 'Spent', remaining: 'Remaining', no_budget: 'No budget set yet',
    budget_ok: 'You are within your budget.', budget_warn: 'You are close to exceeding your budget.', budget_over: 'You have exceeded your budget!',
    savings_sub: 'Plan your goals and achieve them step by step', add_goal: 'Add Goal', edit_goal: 'Edit Goal', goal_name: 'Goal Name',
    target_amount: 'Target Amount', saved_amount: 'Current Saved Amount', target_date: 'Target Date (optional)', no_goals: 'No savings goals yet',
    progress: 'Progress', add_saving: 'Add Amount', save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit', confirm: 'Confirm',
    analytics_sub: 'A deeper look at your finances', net_difference: 'Net Difference', top_category: 'Top Spending Category', monthly_expenses: 'Monthly Expenses Analysis',
    filter_month: 'Month', settings_sub: 'Customize your Masroofi experience', language: 'Language', theme: 'Theme', light_mode: 'Light', dark_mode: 'Dark',
    currency: 'Currency', currency_hint: 'Only the currency symbol is changed (no price conversion).', data_management: 'Data Management',
    reset_demo: 'Reset Demo Data', delete_all: 'Delete All Data',
    msg_added: 'Added successfully', msg_updated: 'Updated successfully', msg_deleted: 'Deleted successfully', msg_saved: 'Saved successfully',
    msg_exported: 'File exported', msg_reset: 'Demo data has been reset', msg_cleared: 'All data has been deleted',
    confirm_delete_tx: 'Are you sure you want to delete this transaction?', confirm_delete_goal: 'Are you sure you want to delete this goal?',
    confirm_delete_all: 'Are you sure you want to delete all data? This cannot be undone.', confirm_reset: 'Do you want to reset demo data?',
    invalid_amount: 'Please enter a valid amount greater than zero.', required_fields: 'Please fill in all required fields.',
    enter_amount: 'Enter amount to add', invalid_saved: 'Invalid value', budget_saved: 'Budget saved',
    cat_food: 'Food', cat_shopping: 'Shopping', cat_transportation: 'Transportation', cat_study: 'Study', cat_bills: 'Bills',
    cat_health: 'Health', cat_entertainment: 'Entertainment', cat_salary: 'Salary', cat_bonuses: 'Bonuses', cat_other: 'Other',
    no_recent: 'No recent transactions', no_expense_data: 'No expenses to display',
    nav_about: 'About Us', nav_services: 'Our Services', nav_contact: 'Contact Us',
    about_sub: 'Learn about Masroofi, our vision, and our goals',
    about_project_name: 'Masroofi',
    about_tagline: 'A smart platform for personal finance management',
    about_desc: 'Masroofi is a smart personal finance management platform that helps users organize their budgets, track income and expenses, and achieve their financial goals easily and effectively.',
    about_vision_title: 'Our Vision',
    about_vision_text: 'To be the trusted platform that helps individuals build better financial awareness and make clearer, more confident financial decisions.',
    about_goals_title: 'Our Goals',
    about_goal1: 'Simplify tracking daily income and expenses.',
    about_goal2: 'Help users stick to their budget and achieve savings goals.',
    about_goal3: 'Provide clear insights that support smart financial planning.',
    services_sub: 'Practical solutions to help you manage your money effectively',
    service_budget_title: 'Budget Management',
    service_budget_desc: 'Helping users organize their income, allocate their monthly budget, and control their expenses.',
    service_analysis_title: 'Expense Analysis',
    service_analysis_desc: 'Providing analytics and charts that show expenses and categories, helping users understand their financial habits.',
    service_savings_title: 'Savings Planning',
    service_savings_desc: 'Helping users create savings goals, track saved amounts, and monitor progress toward achieving their targets.',
    contact_sub: 'We are happy to hear from you for any inquiry or feedback',
    contact_info_title: 'Contact Information',
    contact_activity_label: 'Business name:',
    contact_activity_name: 'Masroofi',
    contact_whatsapp_label: 'WhatsApp number:',
    contact_address_label: 'Address:',
    contact_address_value: 'Masroofi platform for personal finance management',
    contact_whatsapp_btn: 'Contact us on WhatsApp',
    contact_form_title: 'Send a Message',
    contact_name: 'Name',
    contact_name_ph: 'Enter your name',
    contact_email: 'Email',
    contact_email_ph: 'example@email.com',
    contact_message: 'Message',
    contact_message_ph: 'Write your message here',
    contact_send: 'Send Message',
    contact_err_required: 'Please fill in all required fields.',
    contact_err_email: 'Please enter a valid email address.',
    contact_success: 'Your message has been received successfully. We will get back to you soon.'
  }
};

let state = {
  transactions: [],
  budget: { monthly: 0 },
  goals: [],
  settings: { lang: 'ar', theme: 'light', currency: 'SAR' }
};

let charts = {};
let confirmCallback = null;

// ---------- Storage ----------
function loadState() {
  try {
    state.transactions = JSON.parse(localStorage.getItem(STORAGE_KEYS.transactions) || '[]');
    state.budget = JSON.parse(localStorage.getItem(STORAGE_KEYS.budget) || '{"monthly":0}');
    state.goals = JSON.parse(localStorage.getItem(STORAGE_KEYS.goals) || '[]');
    const savedSettings = JSON.parse(localStorage.getItem(STORAGE_KEYS.settings) || 'null');
    if (savedSettings) state.settings = { ...state.settings, ...savedSettings };
  } catch (e) { console.error(e); }
}
function saveState() {
  localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(state.transactions));
  localStorage.setItem(STORAGE_KEYS.budget, JSON.stringify(state.budget));
  localStorage.setItem(STORAGE_KEYS.goals, JSON.stringify(state.goals));
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(state.settings));
}

function ensureDemoData() {
  const initialized = localStorage.getItem(STORAGE_KEYS.initialized);
  const hasData = state.transactions.length || state.goals.length || (state.budget.monthly > 0);
  if (initialized || hasData) return;
  const today = new Date();
  const ym = (d) => d.toISOString().slice(0,10);
  const d = (offset) => { const x = new Date(today); x.setDate(x.getDate()+offset); return ym(x); };
  state.transactions = [
    { id: uid(), name: state.settings.lang==='ar'?'راتب شهري':'Monthly Salary', amount: 8000, type:'income', category:'salary', date: d(-20), notes:'' },
    { id: uid(), name: state.settings.lang==='ar'?'مكافأة':'Bonus', amount: 500, type:'income', category:'bonuses', date: d(-10), notes:'' },
    { id: uid(), name: state.settings.lang==='ar'?'سوبرماركت':'Groceries', amount: 450, type:'expense', category:'food', date: d(-18), notes:'' },
    { id: uid(), name: state.settings.lang==='ar'?'مواصلات':'Transportation', amount: 120, type:'expense', category:'transportation', date: d(-15), notes:'' },
    { id: uid(), name: state.settings.lang==='ar'?'فاتورة كهرباء':'Electricity Bill', amount: 200, type:'expense', category:'bills', date: d(-12), notes:'' },
    { id: uid(), name: state.settings.lang==='ar'?'كتب دراسية':'Study Books', amount: 180, type:'expense', category:'study', date: d(-8), notes:'' },
    { id: uid(), name: state.settings.lang==='ar'?'تسوق':'Shopping', amount: 300, type:'expense', category:'shopping', date: d(-5), notes:'' },
    { id: uid(), name: state.settings.lang==='ar'?'ترفيه':'Entertainment', amount: 150, type:'expense', category:'entertainment', date: d(-2), notes:'' }
  ];
  state.budget = { monthly: 2500 };
  state.goals = [
    { id: uid(), name: state.settings.lang==='ar'?'شراء لابتوب':'Buy a Laptop', target: 4000, saved: 1200, date: '' },
    { id: uid(), name: state.settings.lang==='ar'?'صندوق طوارئ':'Emergency Fund', target: 6000, saved: 2500, date: '' }
  ];
  localStorage.setItem(STORAGE_KEYS.initialized, '1');
  saveState();
}

// ---------- Helpers ----------
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
function t(key) { return (i18n[state.settings.lang] && i18n[state.settings.lang][key]) || key; }
function formatCurrency(amount) {
  const n = Number(amount || 0);
  const locale = state.settings.lang === 'ar' ? 'ar-SA' : 'en-US';
  // symbol only, no conversion
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: state.settings.currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  } catch {
    return `${n.toFixed(2)} ${state.settings.currency}`;
  }
}
function esc(str) { return String(str ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function currentMonthStr() { return new Date().toISOString().slice(0,7); }

// ---------- Calculations ----------
function getTotals(list = state.transactions) {
  let income = 0, expenses = 0;
  list.forEach(tx => { if (tx.type === 'income') income += Number(tx.amount); else expenses += Number(tx.amount); });
  return { income, expenses, balance: income - expenses };
}
function getMonthlyExpenses(month) {
  return state.transactions.filter(tx => tx.type === 'expense' && (!month || tx.date.startsWith(month)));
}
function getExpensesByCategory(list) {
  const map = {};
  list.filter(tx => tx.type === 'expense').forEach(tx => { map[tx.category] = (map[tx.category] || 0) + Number(tx.amount); });
  return map;
}
function getCategoryLabel(key) { return t('cat_' + key) || key; }

// ---------- Theme & Language ----------
function applySettings() {
  document.documentElement.lang = state.settings.lang;
  document.documentElement.dir = state.settings.lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.classList.toggle('dark', state.settings.theme === 'dark');
  document.getElementById('langToggle').textContent = state.settings.lang === 'ar' ? 'EN' : 'AR';
  document.getElementById('themeToggle').textContent = state.settings.theme === 'dark' ? '☀️' : '🌙';
  document.getElementById('settingLanguage').value = state.settings.lang;
  document.getElementById('settingTheme').value = state.settings.theme;
  document.getElementById('settingCurrency').value = state.settings.currency;
  applyTranslations();
}
function updatePageTitle() {
  const active = document.querySelector('.section.active');
  if (!active) return;
  const key = 'nav_' + active.id;
  document.getElementById('pageTitle').textContent = t(key);
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  // update select option texts that use data-i18n
  document.querySelectorAll('option[data-i18n]').forEach(opt => { opt.textContent = t(opt.dataset.i18n); });
  populateCategorySelects();
  document.title = state.settings.lang === 'ar' ? 'Masroofi | مصروفي - إدارة المصروفات' : 'Masroofi | Personal Finance Manager';
  updatePageTitle();
}
function toggleLanguage() {
  state.settings.lang = state.settings.lang === 'ar' ? 'en' : 'ar';
  saveState(); applySettings(); renderAll();
}
function toggleTheme() {
  state.settings.theme = state.settings.theme === 'dark' ? 'light' : 'dark';
  saveState(); applySettings(); renderCharts();
}

// ---------- UI Navigation ----------
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.toggle('active', s.id === id));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.section === id));
  updatePageTitle();
  if (window.innerWidth <= 768) document.getElementById('sidebar').classList.remove('open');
  if (id === 'analytics') renderAnalytics();
}
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  if (window.innerWidth <= 768) sb.classList.toggle('open'); else sb.classList.toggle('collapsed');
}

// ---------- Toast & Confirm ----------
function showToast(msg, type='success') {
  const c = document.getElementById('toastContainer');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  c.appendChild(el);
  setTimeout(() => { el.remove(); }, 3000);
}
function openModal(id) { const m = document.getElementById(id); m.classList.add('show'); m.setAttribute('aria-hidden','false'); }
function closeModal(id) { const m = document.getElementById(id); m.classList.remove('show'); m.setAttribute('aria-hidden','true'); }
function confirmDialog(message, onOk) {
  document.getElementById('confirmMessage').textContent = message;
  confirmCallback = onOk;
  openModal('confirmModal');
}

// ---------- Forms / Categories ----------
function populateCategorySelects() {
  const tCat = document.getElementById('tCategory');
  const fCat = document.getElementById('filterCategory');
  const type = document.getElementById('tType')?.value || 'expense';
  const current = tCat.value;
  tCat.innerHTML = '';
  const cats = type === 'income' ? CATEGORIES.income : CATEGORIES.expense;
  // income can also use other common? keep simple
  const allCats = type === 'income' ? ['salary','bonuses','other'] : ['food','shopping','transportation','study','bills','health','entertainment','other'];
  allCats.forEach(c => {
    const opt = document.createElement('option'); opt.value = c; opt.textContent = getCategoryLabel(c); tCat.appendChild(opt);
  });
  if ([...tCat.options].some(o=>o.value===current)) tCat.value = current;
  // filter categories (all unique)
  const selected = fCat.value || 'all';
  fCat.innerHTML = `<option value="all">${t('all_categories')}</option>`;
  [...new Set([...CATEGORIES.income, ...CATEGORIES.expense])].forEach(c => {
    const opt = document.createElement('option'); opt.value = c; opt.textContent = getCategoryLabel(c); fCat.appendChild(opt);
  });
  fCat.value = selected;
}

// ---------- Transactions ----------
function openTransactionModal(tx=null) {
  document.getElementById('transactionForm').reset();
  document.getElementById('transactionId').value = tx ? tx.id : '';
  document.getElementById('transactionModalTitle').textContent = tx ? t('edit_transaction') : t('add_transaction');
  document.getElementById('tDate').value = tx ? tx.date : new Date().toISOString().slice(0,10);
  document.getElementById('tType').value = tx ? tx.type : 'expense';
  populateCategorySelects();
  if (tx) {
    document.getElementById('tName').value = tx.name;
    document.getElementById('tAmount').value = tx.amount;
    document.getElementById('tCategory').value = tx.category;
    document.getElementById('tNotes').value = tx.notes || '';
  }
  openModal('transactionModal');
}
function saveTransaction(e) {
  e.preventDefault();
  const id = document.getElementById('transactionId').value;
  const name = document.getElementById('tName').value.trim();
  const amount = parseFloat(document.getElementById('tAmount').value);
  const type = document.getElementById('tType').value;
  const category = document.getElementById('tCategory').value;
  const date = document.getElementById('tDate').value;
  const notes = document.getElementById('tNotes').value.trim();
  if (!name || !date || !category || !type) return showToast(t('required_fields'),'error');
  if (!(amount > 0)) return showToast(t('invalid_amount'),'error');
  const tx = { id: id || uid(), name, amount, type, category, date, notes };
  if (id) {
    const i = state.transactions.findIndex(x=>x.id===id); if (i>=0) state.transactions[i]=tx;
    showToast(t('msg_updated'));
  } else {
    state.transactions.push(tx);
    showToast(t('msg_added'));
  }
  saveState(); closeModal('transactionModal'); renderAll();
}
function deleteTransaction(id) {
  confirmDialog(t('confirm_delete_tx'), () => {
    state.transactions = state.transactions.filter(x=>x.id!==id);
    saveState(); renderAll(); showToast(t('msg_deleted'));
  });
}
function getFilteredTransactions() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  const type = document.getElementById('filterType').value;
  const cat = document.getElementById('filterCategory').value;
  const month = document.getElementById('filterMonth').value;
  return [...state.transactions]
    .filter(tx => (type==='all' || tx.type===type))
    .filter(tx => (cat==='all' || tx.category===cat))
    .filter(tx => (!month || tx.date.startsWith(month)))
    .filter(tx => (!q || tx.name.toLowerCase().includes(q) || (tx.notes||'').toLowerCase().includes(q)))
    .sort((a,b)=> b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
}
function renderTransactions() {
  const list = getFilteredTransactions();
  const tbody = document.getElementById('transactionsBody');
  const empty = document.getElementById('transactionsEmpty');
  tbody.innerHTML = '';
  if (!list.length) { empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  list.forEach(tx => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${esc(tx.date)}</td>
      <td>${esc(tx.name)}</td>
      <td><span class="badge ${tx.type}">${t(tx.type)}</span></td>
      <td>${esc(getCategoryLabel(tx.category))}</td>
      <td class="${tx.type==='income'?'amount-pos':'amount-neg'}">${tx.type==='income'?'+':'-'}${formatCurrency(tx.amount)}</td>
      <td>${esc(tx.notes||'-')}</td>
      <td class="table-actions">
        <button class="btn small secondary" data-edit-tx="${tx.id}">${t('edit')}</button>
        <button class="btn small danger-btn" data-del-tx="${tx.id}">${t('delete')}</button>
      </td>`;
    tbody.appendChild(tr);
  });
  tbody.querySelectorAll('[data-edit-tx]').forEach(b=>b.onclick=()=>openTransactionModal(state.transactions.find(x=>x.id===b.dataset.editTx)));
  tbody.querySelectorAll('[data-del-tx]').forEach(b=>b.onclick=()=>deleteTransaction(b.dataset.delTx));
}

// ---------- Budget ----------
function renderBudget() {
  document.getElementById('budgetAmount').value = state.budget.monthly || '';
  const status = document.getElementById('budgetStatus');
  const progress = document.getElementById('budgetProgress');
  const alert = document.getElementById('budgetAlert');
  const month = currentMonthStr();
  const spent = getMonthlyExpenses(month).reduce((s,tx)=>s+Number(tx.amount),0);
  const monthly = Number(state.budget.monthly||0);
  const remaining = monthly - spent;
  if (monthly <= 0) {
    status.innerHTML = `<p class="list-meta">${t('no_budget')}</p>`;
    progress.style.width = '0%'; progress.className = 'progress-fill';
    alert.className = 'alert hidden'; alert.textContent='';
  } else {
    status.innerHTML = `
      <div class="list-item"><span>${t('monthly_budget')}</span><strong>${formatCurrency(monthly)}</strong></div>
      <div class="list-item"><span>${t('spent')}</span><strong class="amount-neg">${formatCurrency(spent)}</strong></div>
      <div class="list-item"><span>${t('remaining')}</span><strong class="${remaining>=0?'amount-pos':'amount-neg'}">${formatCurrency(remaining)}</strong></div>`;
    const pct = Math.min((spent/monthly)*100, 100);
    progress.style.width = pct + '%';
    progress.className = 'progress-fill' + (pct >= 100 ? ' danger' : pct >= 80 ? ' warn' : '');
    alert.className = 'alert';
    if (pct >= 100) { alert.classList.add('danger'); alert.textContent = t('budget_over'); }
    else if (pct >= 80) { alert.classList.add('warn'); alert.textContent = t('budget_warn'); }
    else { alert.classList.add('hidden'); alert.textContent = t('budget_ok'); }
  }
  // dashboard summary
  const dash = document.getElementById('dashboardBudgetSummary');
  if (monthly <= 0) dash.innerHTML = `<p class="list-meta">${t('no_budget')}</p>`;
  else {
    const pct = monthly? Math.min((spent/monthly)*100, 999):0;
    dash.innerHTML = `
      <div class="list-item"><span>${t('monthly_budget')}</span><strong>${formatCurrency(monthly)}</strong></div>
      <div class="list-item"><span>${t('spent')}</span><strong class="amount-neg">${formatCurrency(spent)}</strong></div>
      <div class="list-item"><span>${t('remaining')}</span><strong class="${remaining>=0?'amount-pos':'amount-neg'}">${formatCurrency(remaining)}</strong></div>
      <div class="progress-bar"><div class="progress-fill ${pct>=100?'danger':pct>=80?'warn':''}" style="width:${Math.min(pct,100)}%"></div></div>`;
  }
  document.getElementById('statBudgetRemaining').textContent = monthly>0 ? formatCurrency(remaining) : formatCurrency(0);
  if (monthly>0 && spent/monthly >= 0.8) {
    // show alert once per render cycle lightly via toast? avoid spam; keep visual alert in UI
  }
}
function saveBudget(e) {
  e.preventDefault();
  const val = parseFloat(document.getElementById('budgetAmount').value);
  if (!(val >= 0)) return showToast(t('invalid_amount'),'error');
  state.budget.monthly = val; saveState(); renderAll(); showToast(t('budget_saved'));
}

// ---------- Goals ----------
function openGoalModal(goal=null) {
  document.getElementById('goalForm').reset();
  document.getElementById('goalId').value = goal ? goal.id : '';
  document.getElementById('goalModalTitle').textContent = goal ? t('edit_goal') : t('add_goal');
  if (goal) {
    document.getElementById('gName').value = goal.name;
    document.getElementById('gTarget').value = goal.target;
    document.getElementById('gSaved').value = goal.saved;
    document.getElementById('gDate').value = goal.date || '';
  } else {
    document.getElementById('gSaved').value = 0;
  }
  openModal('goalModal');
}
function saveGoal(e) {
  e.preventDefault();
  const id = document.getElementById('goalId').value;
  const name = document.getElementById('gName').value.trim();
  const target = parseFloat(document.getElementById('gTarget').value);
  const saved = parseFloat(document.getElementById('gSaved').value);
  const date = document.getElementById('gDate').value;
  if (!name) return showToast(t('required_fields'),'error');
  if (!(target > 0) || !(saved >= 0)) return showToast(t('invalid_amount'),'error');
  const goal = { id: id || uid(), name, target, saved, date };
  if (id) { const i = state.goals.findIndex(g=>g.id===id); if (i>=0) state.goals[i]=goal; showToast(t('msg_updated')); }
  else { state.goals.push(goal); showToast(t('msg_added')); }
  saveState(); closeModal('goalModal'); renderAll();
}
function deleteGoal(id) {
  confirmDialog(t('confirm_delete_goal'), () => {
    state.goals = state.goals.filter(g=>g.id!==id); saveState(); renderAll(); showToast(t('msg_deleted'));
  });
}
function addSavingToGoal(id) {
  const input = prompt(t('enter_amount'));
  if (input === null) return;
  const val = parseFloat(input);
  if (!(val > 0)) return showToast(t('invalid_amount'),'error');
  const g = state.goals.find(x=>x.id===id); if (!g) return;
  g.saved = Number(g.saved) + val; saveState(); renderAll(); showToast(t('msg_updated'));
}
function renderGoals() {
  const list = document.getElementById('goalsList');
  const empty = document.getElementById('goalsEmpty');
  list.innerHTML = '';
  if (!state.goals.length) { empty.classList.remove('hidden'); }
  else { empty.classList.add('hidden'); }
  state.goals.forEach(g => {
    const pct = g.target ? Math.min((g.saved/g.target)*100, 100) : 0;
    const card = document.createElement('div');
    card.className = 'card goal-card';
    card.innerHTML = `
      <div class="goal-top">
        <div>
          <h4>${esc(g.name)}</h4>
          <p class="list-meta">${g.date ? esc(g.date) : ''}</p>
        </div>
        <strong>${pct.toFixed(0)}%</strong>
      </div>
      <div class="list-meta">${formatCurrency(g.saved)} / ${formatCurrency(g.target)}</div>
      <div class="progress-bar"><div class="progress-fill ${pct>=100?'':' '}" style="width:${pct}%"></div></div>
      <div class="goal-actions">
        <button class="btn small secondary" data-add-save="${g.id}">${t('add_saving')}</button>
        <button class="btn small secondary" data-edit-goal="${g.id}">${t('edit')}</button>
        <button class="btn small danger-btn" data-del-goal="${g.id}">${t('delete')}</button>
      </div>`;
    list.appendChild(card);
  });
  list.querySelectorAll('[data-add-save]').forEach(b=>b.onclick=()=>addSavingToGoal(b.dataset.addSave));
  list.querySelectorAll('[data-edit-goal]').forEach(b=>b.onclick=()=>openGoalModal(state.goals.find(x=>x.id===b.dataset.editGoal)));
  list.querySelectorAll('[data-del-goal]').forEach(b=>b.onclick=()=>deleteGoal(b.dataset.delGoal));
  // dashboard summary
  const dash = document.getElementById('dashboardSavingsSummary');
  if (!state.goals.length) dash.innerHTML = `<p class="list-meta">${t('no_goals')}</p>`;
  else {
    dash.innerHTML = state.goals.slice(0,3).map(g=>{
      const pct = g.target?Math.min((g.saved/g.target)*100,100):0;
      return `<div style="margin-bottom:.7rem"><div class="list-item"><span>${esc(g.name)}</span><span>${pct.toFixed(0)}%</span></div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div></div>`;
    }).join('');
  }
}

// ---------- Dashboard / Charts ----------
function renderDashboard() {
  const { income, expenses, balance } = getTotals();
  document.getElementById('statBalance').textContent = formatCurrency(balance);
  document.getElementById('statIncome').textContent = formatCurrency(income);
  document.getElementById('statExpenses').textContent = formatCurrency(expenses);
  // recent
  const recent = [...state.transactions].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5);
  const container = document.getElementById('recentTransactions');
  if (!recent.length) container.innerHTML = `<p class="list-meta">${t('no_recent')}</p>`;
  else container.innerHTML = recent.map(tx=>`
    <div class="list-item">
      <div><div>${esc(tx.name)}</div><div class="list-meta">${esc(tx.date)} · ${esc(getCategoryLabel(tx.category))}</div></div>
      <div class="${tx.type==='income'?'amount-pos':'amount-neg'}">${tx.type==='income'?'+':'-'}${formatCurrency(tx.amount)}</div>
    </div>`).join('');
}

function chartColors() {
  const dark = state.settings.theme === 'dark';
  return {
    text: dark ? '#F4F2FF' : '#25243A',
    grid: dark ? '#373452' : '#E4E1F0',
    primary: '#8B7CF6',
    success: '#4CAF84',
    danger: '#E57373',
    palette: ['#8B7CF6','#B8E6D0','#C9DDF8','#F2B705','#E57373','#7ED9B0','#A89BFF','#FFB74D']
  };
}
function destroyChart(key){ if (charts[key]) { charts[key].destroy(); delete charts[key]; } }
function renderCharts() {
  const c = chartColors();
  Chart.defaults.color = c.text;
  Chart.defaults.borderColor = c.grid;
  const { income, expenses } = getTotals();
  // income vs expenses
  destroyChart('incomeExpense');
  charts.incomeExpense = new Chart(document.getElementById('incomeExpenseChart'), {
    type: 'bar',
    data: { labels: [t('income'), t('expense')], datasets: [{ label: t('amount'), data: [income, expenses], backgroundColor: [c.success, c.danger], borderRadius: 8 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
  });
  // category pie
  const catMap = getExpensesByCategory(state.transactions);
  const labels = Object.keys(catMap).map(getCategoryLabel);
  const data = Object.values(catMap);
  destroyChart('category');
  const catCtx = document.getElementById('categoryChart');
  if (!data.length) {
    charts.category = new Chart(catCtx, { type:'doughnut', data:{labels:[t('no_data')], datasets:[{data:[1], backgroundColor:[c.grid]}]}, options:{responsive:true,maintainAspectRatio:false}});
  } else {
    charts.category = new Chart(catCtx, { type:'doughnut', data:{labels, datasets:[{data, backgroundColor:c.palette}]}, options:{responsive:true,maintainAspectRatio:false}});
  }
}

function renderAnalytics() {
  const month = document.getElementById('analyticsMonth').value;
  const list = month ? state.transactions.filter(tx=>tx.date.startsWith(month)) : state.transactions;
  const { income, expenses, balance } = getTotals(list);
  document.getElementById('anIncome').textContent = formatCurrency(income);
  document.getElementById('anExpenses').textContent = formatCurrency(expenses);
  document.getElementById('anNet').textContent = formatCurrency(balance);
  const catMap = getExpensesByCategory(list);
  let top = '-'; let topVal = -1;
  Object.entries(catMap).forEach(([k,v])=>{ if(v>topVal){topVal=v; top=getCategoryLabel(k);} });
  document.getElementById('anTopCategory').textContent = topVal>=0 ? top : '-';
  const c = chartColors();
  // bar
  destroyChart('anBar');
  charts.anBar = new Chart(document.getElementById('analyticsBarChart'), {
    type:'bar', data:{ labels:[t('income'), t('expense')], datasets:[{label:t('amount'), data:[income,expenses], backgroundColor:[c.success,c.danger], borderRadius:8}]},
    options:{responsive:true,maintainAspectRatio:false, plugins:{legend:{display:false}}}
  });
  // monthly line (all months)
  const monthMap = {};
  state.transactions.forEach(tx=>{ if(tx.type==='expense'){ const m=tx.date.slice(0,7); monthMap[m]=(monthMap[m]||0)+Number(tx.amount);} });
  const months = Object.keys(monthMap).sort();
  destroyChart('anLine');
  charts.anLine = new Chart(document.getElementById('analyticsLineChart'), {
    type:'line', data:{ labels: months.length?months:[currentMonthStr()], datasets:[{label:t('expense'), data: months.length?months.map(m=>monthMap[m]):[0], borderColor:c.primary, backgroundColor:'rgba(139,124,246,.2)', fill:true, tension:.3}]},
    options:{responsive:true,maintainAspectRatio:false}
  });
  // pie
  const labels = Object.keys(catMap).map(getCategoryLabel); const data = Object.values(catMap);
  destroyChart('anPie');
  const pieCtx = document.getElementById('analyticsPieChart');
  if(!data.length) charts.anPie = new Chart(pieCtx,{type:'pie',data:{labels:[t('no_data')],datasets:[{data:[1],backgroundColor:[c.grid]}]},options:{responsive:true,maintainAspectRatio:false}});
  else charts.anPie = new Chart(pieCtx,{type:'pie',data:{labels,datasets:[{data,backgroundColor:c.palette}]},options:{responsive:true,maintainAspectRatio:false}});
}

function renderAll() {
  applyTranslations();
  renderDashboard();
  renderTransactions();
  renderBudget();
  renderGoals();
  renderCharts();
  if (document.getElementById('analytics').classList.contains('active')) renderAnalytics();
}

// ---------- Export / Print / Data ----------
function exportCSV() {
  const rows = [['Date','Name','Type','Category','Amount','Notes']];
  [...state.transactions].sort((a,b)=>a.date.localeCompare(b.date)).forEach(tx => {
    rows.push([tx.date, tx.name, tx.type, getCategoryLabel(tx.category), tx.amount, (tx.notes||'').replace(/\n/g,' ')]);
  });
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob(['\ufeff'+csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'masroofi-transactions.csv'; a.click();
  URL.revokeObjectURL(url);
  showToast(t('msg_exported'));
}
function printReport() { window.print(); }
function resetDemoData() {
  confirmDialog(t('confirm_reset'), () => {
    localStorage.removeItem(STORAGE_KEYS.initialized);
    localStorage.removeItem(STORAGE_KEYS.transactions);
    localStorage.removeItem(STORAGE_KEYS.budget);
    localStorage.removeItem(STORAGE_KEYS.goals);
    state.transactions=[]; state.budget={monthly:0}; state.goals=[];
    ensureDemoData(); saveState(); renderAll(); showToast(t('msg_reset'));
  });
}
function deleteAllData() {
  confirmDialog(t('confirm_delete_all'), () => {
    state.transactions=[]; state.budget={monthly:0}; state.goals=[];
    localStorage.removeItem(STORAGE_KEYS.initialized);
    saveState(); renderAll(); showToast(t('msg_cleared'));
  });
}

// ---------- Contact ----------
function showContactFormMessage(type, key) {
  const el = document.getElementById('contactFormMessage');
  if (!el) return;
  el.className = 'form-message ' + (type || '');
  el.textContent = key ? t(key) : '';
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  if (!name || !email || !message) {
    showContactFormMessage('error', 'contact_err_required');
    showToast(t('contact_err_required'), 'error');
    return;
  }
  if (!isValidEmail(email)) {
    showContactFormMessage('error', 'contact_err_email');
    showToast(t('contact_err_email'), 'error');
    return;
  }
  showContactFormMessage('success', 'contact_success');
  showToast(t('contact_success'), 'success');
  document.getElementById('contactForm').reset();
}

// ---------- Events ----------
function bindEvents() {
  document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', e => { e.preventDefault(); showSection(link.dataset.section); }));
  document.querySelectorAll('[data-goto]').forEach(btn => btn.addEventListener('click', () => showSection(btn.dataset.goto)));
  document.getElementById('heroAddTransactionBtn').addEventListener('click', () => openTransactionModal());
  document.getElementById('heroExploreAnalyticsBtn').addEventListener('click', () => showSection('analytics'));
  document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
  document.getElementById('mobileMenuBtn').addEventListener('click', ()=>document.getElementById('sidebar').classList.toggle('open'));
  document.getElementById('langToggle').addEventListener('click', toggleLanguage);
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  // modals close
  document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', () => closeModal(el.dataset.close)));
  document.getElementById('confirmCancel').addEventListener('click', ()=>closeModal('confirmModal'));
  document.getElementById('confirmOk').addEventListener('click', ()=>{ closeModal('confirmModal'); if(confirmCallback) confirmCallback(); confirmCallback=null; });
  // transactions
  document.getElementById('addTransactionBtn').addEventListener('click', ()=>openTransactionModal());
  document.getElementById('emptyAddTransaction').addEventListener('click', ()=>openTransactionModal());
  document.getElementById('transactionForm').addEventListener('submit', saveTransaction);
  document.getElementById('tType').addEventListener('change', populateCategorySelects);
  ['searchInput','filterType','filterCategory','filterMonth'].forEach(id => document.getElementById(id).addEventListener('input', renderTransactions));
  document.getElementById('clearFilters').addEventListener('click', ()=>{ document.getElementById('searchInput').value=''; document.getElementById('filterType').value='all'; document.getElementById('filterCategory').value='all'; document.getElementById('filterMonth').value=''; renderTransactions(); });
  document.getElementById('exportCsvBtn').addEventListener('click', exportCSV);
  document.getElementById('printBtn').addEventListener('click', printReport);
  // budget
  document.getElementById('budgetForm').addEventListener('submit', saveBudget);
  // goals
  document.getElementById('addGoalBtn').addEventListener('click', ()=>openGoalModal());
  document.getElementById('emptyAddGoal').addEventListener('click', ()=>openGoalModal());
  document.getElementById('goalForm').addEventListener('submit', saveGoal);
  // analytics
  document.getElementById('analyticsMonth').addEventListener('change', renderAnalytics);
  // contact
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
    ['contactName','contactEmail','contactMessage'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => showContactFormMessage('', ''));
    });
  }
  // settings
  document.getElementById('settingLanguage').addEventListener('change', e=>{ state.settings.lang=e.target.value; saveState(); applySettings(); renderAll(); });
  document.getElementById('settingTheme').addEventListener('change', e=>{ state.settings.theme=e.target.value; saveState(); applySettings(); renderCharts(); renderAnalytics(); });
  document.getElementById('settingCurrency').addEventListener('change', e=>{ state.settings.currency=e.target.value; saveState(); renderAll(); });
  document.getElementById('resetDemoBtn').addEventListener('click', resetDemoData);
  document.getElementById('deleteAllBtn').addEventListener('click', deleteAllData);
  // close sidebar on outside click mobile
  document.addEventListener('click', (e)=>{
    const sb = document.getElementById('sidebar');
    if (window.innerWidth<=768 && sb.classList.contains('open') && !sb.contains(e.target) && e.target.id!=='mobileMenuBtn') sb.classList.remove('open');
  });
}

// ---------- Init ----------
function init() {
  loadState();
  ensureDemoData();
  document.getElementById('analyticsMonth').value = currentMonthStr();
  populateCategorySelects();
  applySettings();
  bindEvents();
  renderAll();
}

document.addEventListener('DOMContentLoaded', init);