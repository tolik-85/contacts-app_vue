--переименовать компоненты, чтоб небыло компонентов из 1 слова.
--логика создания недавних звонков в корневой компонент

компонент редактирования контакта не должен выбрасывать родительскому компоненту ссылку на своё состояние.

при именовании компонентов больше двух слов. название сущности с которой работает компонент. должно быть первым в названии.

убираем числа из названий

AddContactModal1.vue -> ContactSubmitterModal

ContactsListTab
СontactItem

название*сущности / что*делает / как\*выглядит

watch: {
// contacts: {
// deep: true,
// handler(newValue) {
// myStorage.setContacts(newValue)
// },
// },
// recentCalls: {
// deep: true,
// handler(newValue) {
// localStorage.setItem('recentCalls', JSON.stringify(newValue))
// },
// },
},

// mounted() {
// const contactsFromStorage = JSON.parse(localStorage.getItem('contacts'))
// const recentCallsFromStorage = JSON.parse(localStorage.getItem('contacts'))
// if (contactsFromStorage) {
// this.contacts = contactsFromStorage
// }
// if (recentCallsFromStorage) {
// this.recentCalls = recentCallsFromStorage
// }
// },
