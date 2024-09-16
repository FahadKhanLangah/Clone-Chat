import image from "../assets/image.png"

const Conversation = () => {
  return (
    <>
      <div className="flex backdrop-blur-3xl bg-opacity-100 mb-1 hover:bg-gray-400">
        <div className="flex flex-[20%] items-center h-20  w-20 border-b-1 mt-1">
          <img className="h-16 p-1 m-2 ml-6 w-16 rounded-full " src={image} alt="image not found" />
        </div>
        <div className="pt-4 flex-[80%] pl-6 overflow-hidden h-20">
          <h1 className="text-2xl font-bold">Fahad Khan</h1>
          <p className="overflow-hidden">Fahad kaha ho ?? </p>
        </div>
      </div>
    </>
  )
}

export default Conversation