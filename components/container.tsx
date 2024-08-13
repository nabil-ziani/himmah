import clsx from 'clsx'

export function Container({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) {
    return (
        <div
            className={clsx('mx-auto max-w-[90vw] px-4 sm:px-6 lg:px-8', className)}
            {...props}
        />
    )
}
