export default function Loading() {
    return (
        <div className="container mx-auto min-h-screen px-4 py-10">
            <div className="animate-pulse">
                <div className="mb-10 space-y-3">
                    <div className="h-7 w-64 rounded bg-grayLighter"/>
                    <div className="h-4 w-48 rounded bg-grayLighter"/>
                </div>

                <div className="
          grid
          grid-cols-1
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        ">
                    {Array.from({length: 8}).map((_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
                        >
                            <div className="h-48 w-full bg-grayLighter"/>

                            <div className="p-4 space-y-3">
                                <div className="h-5 w-3/4 rounded bg-grayLighter"/>
                                <div className="h-4 w-1/2 rounded bg-grayLighter"/>
                                <div className="h-4 w-2/3 rounded bg-grayLighter"/>

                                <div className="flex gap-3 pt-2">
                                    <div className="h-4 w-16 rounded bg-grayLighter"/>
                                    <div className="h-4 w-16 rounded bg-grayLighter"/>
                                    <div className="h-4 w-16 rounded bg-grayLighter"/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
