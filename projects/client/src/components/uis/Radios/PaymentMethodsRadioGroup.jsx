import React from "react";
import { RadioGroup } from "@nextui-org/react";
import { CustomRadio } from "./CustomRadio";

const PaymentMethodsRadioGroup = () => {
	return (
		<RadioGroup className="w-full" defaultValue="bt">
			<CustomRadio value="bt" isSelected>
				Bank Transfer
			</CustomRadio>
			<CustomRadio value="pp" description="Coming soon." isDisabled>
				Paypal
			</CustomRadio>
			<CustomRadio value="cod" description="Coming soon." isDisabled>
				Cash on Delivery
			</CustomRadio>
		</RadioGroup>
	);
};

export default PaymentMethodsRadioGroup;
