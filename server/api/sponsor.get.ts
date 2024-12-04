export default eventHandler(async () => {
  return {
    community: await getActivityStats(),
  }
})
