/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/listings/manager";
exports.ids = ["pages/listings/manager"];
exports.modules = {

/***/ "./pages/listings/manager/index.js":
/*!*****************************************!*\
  !*** ./pages/listings/manager/index.js ***!
  \*****************************************/
/***/ (() => {

eval("/*import React, { Component } from \"react\";\nimport Layout from \"../../../components/Layout\";\nimport { Grid, Table } from \"semantic-ui-react\";\nimport { InvestorRow } from \"../../../components/InvestorRow\";\n\nclass ManagerIndex extends Component {\n    static async getInitialProps(props) {\n        //console.log(props.query.address);\n        listingAddresss = props.query.address;\n        const listing = PropertyListing(props.query.address);\n        const summary = await listing.methods.getListingDetails().call();\n        \n        const investorCount = await listing.methods.getInvestorCount().call();\n        const investors = await Promise.all(\n            Array(investorCount)\n            .fill()\n            .map((element, index) => {\n                return listing.methods.investors(index).call();\n            })\n        );\n        \n        //console.log(summary);\n        name = summary[0];\n        description = summary[1];\n        propertyAddress= summary[2];\n        totalSupply= summary[3];\n        listingTimestamp= summary[4];\n        managerAddress= summary[5];\n        balance= fromWei(summary[6]);\n        targetAmount= fromWei(summary[7]);\n        status= summary[8]==='0n'?'Raising Funds':\"Property is not currently financing\";\n        return summary;\n     }\n    \n    render () {\n        const { Header, Row, HeaderCell, Body } = Table;\n        return (\n            <Layout>\n                <h3>Manager Portal</h3>\n                <Table>\n                    <Header>\n                        <Row>\n                            <HeaderCell>ID</HeaderCell>\n                            <HeaderCell>Address</HeaderCell>\n                            <HeaderCell>Invested Amount</HeaderCell>\n                        </Row>\n                    </Header>\n                </Table>\n            </Layout>\n        );\n    }\n}\n\nexport default ManagerIndex;*/ //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZnByb3BlcnQvLi9wYWdlcy9saXN0aW5ncy9tYW5hZ2VyL2luZGV4LmpzP2JhZDQiXSwic291cmNlc0NvbnRlbnQiOlsiLyppbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgTGF5b3V0IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL0xheW91dFwiO1xuaW1wb3J0IHsgR3JpZCwgVGFibGUgfSBmcm9tIFwic2VtYW50aWMtdWktcmVhY3RcIjtcbmltcG9ydCB7IEludmVzdG9yUm93IH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvSW52ZXN0b3JSb3dcIjtcblxuY2xhc3MgTWFuYWdlckluZGV4IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgYXN5bmMgZ2V0SW5pdGlhbFByb3BzKHByb3BzKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2cocHJvcHMucXVlcnkuYWRkcmVzcyk7XG4gICAgICAgIGxpc3RpbmdBZGRyZXNzcyA9IHByb3BzLnF1ZXJ5LmFkZHJlc3M7XG4gICAgICAgIGNvbnN0IGxpc3RpbmcgPSBQcm9wZXJ0eUxpc3RpbmcocHJvcHMucXVlcnkuYWRkcmVzcyk7XG4gICAgICAgIGNvbnN0IHN1bW1hcnkgPSBhd2FpdCBsaXN0aW5nLm1ldGhvZHMuZ2V0TGlzdGluZ0RldGFpbHMoKS5jYWxsKCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpbnZlc3RvckNvdW50ID0gYXdhaXQgbGlzdGluZy5tZXRob2RzLmdldEludmVzdG9yQ291bnQoKS5jYWxsKCk7XG4gICAgICAgIGNvbnN0IGludmVzdG9ycyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAgICAgQXJyYXkoaW52ZXN0b3JDb3VudClcbiAgICAgICAgICAgIC5maWxsKClcbiAgICAgICAgICAgIC5tYXAoKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RpbmcubWV0aG9kcy5pbnZlc3RvcnMoaW5kZXgpLmNhbGwoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIFxuICAgICAgICAvL2NvbnNvbGUubG9nKHN1bW1hcnkpO1xuICAgICAgICBuYW1lID0gc3VtbWFyeVswXTtcbiAgICAgICAgZGVzY3JpcHRpb24gPSBzdW1tYXJ5WzFdO1xuICAgICAgICBwcm9wZXJ0eUFkZHJlc3M9IHN1bW1hcnlbMl07XG4gICAgICAgIHRvdGFsU3VwcGx5PSBzdW1tYXJ5WzNdO1xuICAgICAgICBsaXN0aW5nVGltZXN0YW1wPSBzdW1tYXJ5WzRdO1xuICAgICAgICBtYW5hZ2VyQWRkcmVzcz0gc3VtbWFyeVs1XTtcbiAgICAgICAgYmFsYW5jZT0gZnJvbVdlaShzdW1tYXJ5WzZdKTtcbiAgICAgICAgdGFyZ2V0QW1vdW50PSBmcm9tV2VpKHN1bW1hcnlbN10pO1xuICAgICAgICBzdGF0dXM9IHN1bW1hcnlbOF09PT0nMG4nPydSYWlzaW5nIEZ1bmRzJzpcIlByb3BlcnR5IGlzIG5vdCBjdXJyZW50bHkgZmluYW5jaW5nXCI7XG4gICAgICAgIHJldHVybiBzdW1tYXJ5O1xuICAgICB9XG4gICAgXG4gICAgcmVuZGVyICgpIHtcbiAgICAgICAgY29uc3QgeyBIZWFkZXIsIFJvdywgSGVhZGVyQ2VsbCwgQm9keSB9ID0gVGFibGU7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TGF5b3V0PlxuICAgICAgICAgICAgICAgIDxoMz5NYW5hZ2VyIFBvcnRhbDwvaDM+XG4gICAgICAgICAgICAgICAgPFRhYmxlPlxuICAgICAgICAgICAgICAgICAgICA8SGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFJvdz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SGVhZGVyQ2VsbD5JRDwvSGVhZGVyQ2VsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SGVhZGVyQ2VsbD5BZGRyZXNzPC9IZWFkZXJDZWxsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxIZWFkZXJDZWxsPkludmVzdGVkIEFtb3VudDwvSGVhZGVyQ2VsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvUm93PlxuICAgICAgICAgICAgICAgICAgICA8L0hlYWRlcj5cbiAgICAgICAgICAgICAgICA8L1RhYmxlPlxuICAgICAgICAgICAgPC9MYXlvdXQ+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VySW5kZXg7Ki8iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQXFENEIsR0FyRDVCIiwiZmlsZSI6Ii4vcGFnZXMvbGlzdGluZ3MvbWFuYWdlci9pbmRleC5qcy5qcyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/listings/manager/index.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/listings/manager/index.js"));
module.exports = __webpack_exports__;

})();