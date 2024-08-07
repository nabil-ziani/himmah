interface SeparatorProps {
    text: string
    color?: string
}

export default function Separator({ text, color }: SeparatorProps) {
    return (
        <div className="relative mb-5">
            <div className="relative flex items-center py-1">
                <div className={`grow border-t ${color ? color : 'border-zinc-700'}`}></div>
                <span className={`mx-3 shrink text-sm leading-8 ${color ? color : 'text-zinc-500 '}`}>
                    {text}
                </span>
                <div className={`grow border-t ${color ? color : 'border-zinc-700'}`}></div>
            </div>
        </div>
    );
}
