async function sleep(ms: number){
  return new Promise(r => setTimeout(r, ms))
}

export const Blocking = async () => {

  await sleep(8000)

  return (
    <div>Blocking</div>
  )
}