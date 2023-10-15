import { FormEvent, useState, ChangeEvent } from "react";

import styled from "styled-components";

import { CheckItemType } from "./Check";

const Container = styled.div`
  background-color: var(--color-orange-300);
  width: 100%;
`;
const StyledCheckForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 35rem;
  margin: 0 auto;
  padding: 2rem 0;
  height: 6rem;
  @media (max-width: 900px) {
    flex-direction: column;
    padding: 0.5rem 0;
    height: 10rem;
  }
`;
const TextContainer = styled.div`
  display: block;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const arry = Array.from({ length: 20 });
function CheckForm({
  onAddItem,
}: {
  onAddItem: (item: CheckItemType) => void;
}) {
  const [values, setValues] = useState<{ amount: string; text: string }>({
    amount: "1",
    text: "",
  });
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!values.amount || !values.text) return;
    const item = {
      id: crypto.randomUUID(),
      text: values.text,
      amount: Number(values.amount),
      isChecked: false,
    };
    onAddItem(item);
    setValues({ amount: "1", text: "" });
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  return (
    <Container>
      <StyledCheckForm onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount: </label>
          <select
            value={values.amount}
            onChange={handleChange}
            name="amount"
            id="amount"
          >
            {arry.map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <TextContainer>
          <label htmlFor="item">Check item: </label>
          <input
            value={values.text}
            onChange={handleChange}
            name="text"
            id="item"
            type="text"
          />
        </TextContainer>
      </StyledCheckForm>
    </Container>
  );
}

export default CheckForm;
