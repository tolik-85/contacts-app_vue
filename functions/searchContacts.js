export default function searchContacts(query, contacts) {
  const queries = query
    .toLowerCase()
    .split(' ')
    .filter(q => q)

  return contacts
    .filter(contact => {
      const isPropertyContainQuery = queries.map(q => {
        return (
          contact.name.toLowerCase().includes(q) ||
          contact.familyName.toLowerCase().includes(q)
        )
      })
      contact.includesCount = isPropertyContainQuery.filter(item => item).length
      return contact.includesCount
    })
    .toSorted((item, prevItem) => prevItem.includesCount - item.includesCount)
    .map(contact => (delete contact.includesCount, contact))
}
