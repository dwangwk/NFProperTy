import React, {Component} from "react";
import { Table } from "semantic-ui-react";

const InvestorRow = ({ id, investor, investment, address }) => {
    return (
        <Table.Row>
            <Table.Cell>{id}</Table.Cell>
            <Table.Cell>{investor}</Table.Cell>
            <Table.Cell>{investment}</Table.Cell>
        </Table.Row>
    );
};
export default InvestorRow;
