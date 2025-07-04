export const Input = ({ label, ...props }: any) => (
    <label>
        <div>{label}</div>
        <input {...props} className="border p-2 rounded w-full" />
    </label>
);