

const LibraryLoading = () => {
    return (
        <div className="relative w-full">
            <div className="flex flex-wrap w-full">
                <div className="w-full h-64 mb-4 animate-pulse bg-gray-900 m-2"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-30 flex items-center justify-end opacity-100 dark:opacity-80 customGradient p-5">
                <p className="text-white text-2xl me-2">Loading <br />
                </p>
            </div>
        </div>
    )
}

export default LibraryLoading