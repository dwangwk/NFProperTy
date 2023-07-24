import { PropertyListing } from "./contracts";
import web3 from "../web3"
import { toWei } from "./utils/utils";

const getActiveAccount = async () => (await web3.eth.getAccounts())[0];

export async function invest({ propertyAddress, amount }) {
  const PropertyContract = PropertyListing(propertyAddress);
  await PropertyContract.methods.invest().send({
    from: await getActiveAccount(),
    value: toWei(amount),
  });
}

export async function unlistProperty({ propertyAddress }) {
  const PropertyContract = PropertyListing(propertyAddress);
  await PropertyContract.methods.unlistProperty().send({
    from: await getActiveAccount(),
  });
}

export async function withdraw({ withdrawAmount, propertyAddress }) {
  const PropertyContract = PropertyListing(propertyAddress);
  await PropertyContract.methods.withdraw(toWei(withdrawAmount)).send({
    from: await getActiveAccount(),
  });
}
