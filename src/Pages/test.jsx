const Testing = () => {
  return (
    <div className="pt-28 ml-24">
      <div className="max-w-[300px] md:w-[350px] my-20 p-6 md:p-8 shadow-md rounded-2xl  space-y-8">
        {/* profile image & bg  */}

        {/* profile name & role */}
        <div className="pt-8 text-center space-y-1">
          <h1 className="text-xl md:text-2xl">Md hasan</h1>
          <p className="text-gray-400 text-sm">
            Product Designer Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Quo deleniti obcaecati magnam assumenda dolorum accusantium
          </p>
        </div>
        {/* post , followers following  */}
        <div className="flex flex-wrap px-4  md:px-8 justify-between items-center">
          <div className="text-center">
            <h5 className="font-medium text-xl">7</h5>
            <p className="text-sm  text-gray-400">Rating</p>
          </div>
          <div className="text-center">
            <h5 className="font-medium text-xl">9.7k</h5>
            <p className="text-sm  text-gray-400">Like</p>
          </div>
          <div className="text-center">
            <h5 className="font-medium text-xl">217</h5>
            <p className="text-sm  text-gray-400">Dislike</p>
          </div>
        </div>
        <div className="flex justify-center"></div>
      </div>
    </div>
  );
};

export default Testing;
