
export default function FieldMessage({ field }: any) {
    return (
        <>
            {field.state.meta.touchedErrors ? (
                <em className="text-red-600">{field.state.meta.touchedErrors}</em>
            ) : null}
            {field.state.meta.isValidating ? 'Validating...' : null}
        </>
    )
}