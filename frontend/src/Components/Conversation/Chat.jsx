
const Chat = () => {
  
  return (
    <div className='p-4 flex flex-col space-y-4'>
      <div className='flex justify-start'>
        <div className='bg-blue-500 text-white p-3 rounded-lg max-w-md'>
          Hello Fahad, how are you?
        </div>
      </div>
      <div className='flex justify-end'>
        <div className='bg-gray-300 text-black p-3 rounded-lg max-w-md'>
          I`m fine, what about you?
        </div>
      </div>
    </div>
  )
}

export default Chat