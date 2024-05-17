export default function UserBalance({ balance }: { balance: string | null }) {
  return (
    <div className="flex w-[100] ">
      <div>
        <strong> Balance </strong>
      </div>
      <div className="ml-2">{balance ? `$${balance}` : null}</div>
    </div>
  );
}
