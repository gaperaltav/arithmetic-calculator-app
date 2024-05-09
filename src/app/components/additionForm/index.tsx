export default function AdditionForm() {
  return (
    <div className="addition-form">
      <h2>Operation: Addition</h2>
      <label htmlFor="add_num1">num1</label>
      <input type="number" id="add_num1" />
      <label htmlFor="add_num2">num2</label>
      <input type="number" id="add_num2" />
      <button>Run Addition</button>
      <input type="number" id="add_total" />
    </div>
  );
}
