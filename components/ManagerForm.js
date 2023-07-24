import React from "react";
import { Divider, Form, Input, Button } from "semantic-ui-react";
import { unlistProperty, withdraw } from "../ethereum/functions";
import { ModalContext } from "./context/ModalContext";

export default function ManagerForm({
  listingAddress,
  status,
  managerAddress,
  balance,
  toggleRefreshData,
}) {
  const [fields, setFields] = React.useState({
    targetAmount: "",
    sharesOffered: "",
    withdrawAmount: "",
    dividendAmount: "",
  });

  const [loading, setLoading] = React.useState(false);

  const popup = React.useContext(ModalContext);

  const handleUnlistProperty = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await unlistProperty({ campaignAddress });
    } catch (err) {
      if (err.code === 32000 || err.code === 32603) {
        popup("Please reset your MetaMask account");
      } else {
        popup(err.message);
      }
    } finally {
      setLoading(false);
      toggleRefreshData();
    }
  };

  const handleWithdraw = async (event) => {
    const withdrawAmount = fields.withdrawAmount;

    event.preventDefault();
    setLoading(true);
    try {
      await withdraw({ withdrawAmount, listingAddress, managerAddress });
    } catch (err) {
      if (err.code === 32000 || err.code === 32603) {
        popup("Please reset your MetaMask account");
      } else {
        popup(err.message);
      }
    } finally {
      setLoading(false);
      setFields({ ...fields, withdrawAmount: "" });
      toggleRefreshData();
    }
  };

  return (
    <div className="container cardborder">
      <h3>Manage</h3>
      <br />
      {status == 0 && (
        <Button
          fluid
          color="red"
          loading={loading}
          disabled={loading}
          onClick={handleUnlistProperty}
          content={"Unlist Property"}
        />
      )}
      {status == 1 && (
        <>
          <Form>
            <Form.Field>
              <label>Withdrawal Amount</label>
              <Input
                type="number"
                step={0.1}
                min={0}
                max={balance}
                value={fields.withdrawAmount}
                onInput={(event) => {}}
                onChange={(event) =>
                  setFields({
                    ...fields,
                    withdrawAmount: event.target.value,
                  })
                }
                label="ETH"
                labelPosition="right"
              />
            </Form.Field>
          </Form>
          <br />
          <Button
            fluid
            primary
            loading={loading}
            disabled={loading}
            onClick={handleWithdraw}
            content="WITHDRAW"
          />
        </>
      )}
      {status == 2 && (
        <Button fluid color="red" disabled content={"LISTING FAILED"} />
      )}
    </div>
  );
}
