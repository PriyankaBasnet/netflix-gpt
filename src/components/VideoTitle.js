const VideoTitle = ({title,overview}) => {
    return (
        <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white" >
            <h1 className="text-3xl font-bold text-white">{title}</h1>
            <p className="py-6 w-96 text-white">{overview}</p>
            <div className="flex gap-4">
                <button className="bg-gray-300 text-black p-1 w-20 rounded-lg bg-opacity-50">
                    play
                </button>
                <button className="bg-gray-300 text-white p-1 w-20 rounded-lg bg-opacity-50">ⓘ More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle;