export default eventHandler(async () => {
  return {
    activity: await getActivityStats(),
    icons: await getRandomIcons(),
  }
})
