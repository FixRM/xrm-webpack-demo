import { XrmMockGenerator } from "xrm-mock";
import * as sinon from "sinon";
import { Account } from "../src/account";
// import { XrmFakedContext, Entity } from "fakexrmeasy";

const fakeUri = "http://fake";

describe("Account onload tests", () => {
    beforeEach(() => {
        XrmMockGenerator.initialise();
    });

    it("Page methods should work", () => {
        XrmMockGenerator.Attribute.createString("firstname", null);

        //Act
        Account.SetNameOnLoad(XrmMockGenerator.getEventContext());

        //Assert
        let name = Xrm.Page.getAttribute("firstname").getValue();
        expect(name).toBe("Artem");
    });

    it("Navigation methods should work", () => {
        //Setup

        const stub = sinon.stub(Xrm.Navigation, "openAlertDialog")
            .callsFake((as: Xrm.Navigation.AlertStrings, ao?: Xrm.Navigation.DialogSizeOptions): Xrm.Async.PromiseLike<any> => {

                expect(as.text).toBe("This is alert");

                return {} as Xrm.Async.PromiseLike<any>;
            });

        //Act
        Account.OpenAlertOnLoad(XrmMockGenerator.getEventContext());

        //Assert
        expect(stub.calledOnce).toBeTruthy();
    });

    it("WebApi methods should work", async () => {

        //Setup context
        // let xrmFakedContext: XrmFakedContext = new XrmFakedContext("v9", fakeUri, true);
        // let parentAccount = new Entity("account", "9c6ab61a-2ba6-4820-8a9a-ce55a0e79862", {
        //     name: "Parent Name"
        // });
        // xrmFakedContext.initialize([parentAccount]);

        //Setup form
        XrmMockGenerator.Attribute.createLookup("parentcustomerid", { id: "9c6ab61a-2ba6-4820-8a9a-ce55a0e79862", entityType: "account" });
        // XrmMockGenerator.Attribute.createLookup("parentcustomerid", { id: parentAccount.id, entityType: parentAccount.logicalName });
        XrmMockGenerator.Attribute.createString("name", null);

        // const stub = sinon.stub(XrmMockGenerator.getEventContext().getContext(), "getClientUrl")
        //     .returns(fakeUri);
        // XrmMockGenerator.getEventContext().getContext().getClientUrl = () => {
        //     return fakeUri;
        // };

        //Act
        await Account.GetDataOnLoad(XrmMockGenerator.getEventContext());

        //Assert
        let actualName =  Xrm.Page.getAttribute("name").getValue();
        // expect(actualName).toBe(parentAccount.attributes.name);
        expect(actualName).toBe("Parent Name");        
    });
});