export default function Loading() {
    return (
        <div className="container mx-auto lg:px-40 mt-10">
            <div className="animate-pulse space-y-6">
                <div className="h-[280px] w-full rounded-lg bg-grayLighter" />

                <div className="h-6 w-1/2 rounded bg-grayLighter" />
                <div className="h-4 w-3/4 rounded bg-grayLighter" />
                <div className="h-4 w-2/3 rounded bg-grayLighter" />

                <div className="h-[200px] w-full rounded-lg bg-grayLighter" />
            </div>
        </div>
    );
}
