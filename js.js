const makeId = () => Math.trunc(Math.random() * 0xffff_ffff)

const contacts = [{ firstName: 'Vasya', lastName: 'Susanin', phone: '1234567' }]
const recentCalls = []

function createRecentCallByPhone(phone) {
  return {
    id: makeId(),
    phone: phone,
    timestamp: Date.now(),
    get contact() {
      return contacts.find(c => c.phone === phone)
    },
  }
}

function addRecentCallByPhone(phone) {
  const recentCall = createRecentCallByPhone(phone)
  recentCalls.unshift(recentCall)
}

addRecentCallByPhone('111')

console.log(recentCalls[0].contact)

console.log(contacts)

contacts[0].phone = '111'

console.log(contacts)

console.log(recentCalls[0].contact)
