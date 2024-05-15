export default function UserBalance({ balance }: { balance: string | null }) {
  return (
    <div className="flex">
      <div>Balance</div>
      
      <div>{balance ? `$${balance}`: null}</div>
    </div>
  );
}
