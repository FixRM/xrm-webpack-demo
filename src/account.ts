// var WebApiClient = require("xrm-webapi-client");
import WebApiClient from "xrm-webapi-client";

export class Account {

    //In place debug 
    static OnLoad(context: Xrm.Events.EventContext) {
        this.OpenAlertOnLoad(context);
    }

    //Demo of basic form interactions
    static SetNameOnLoad(context: Xrm.Events.EventContext) {
        let formContext = context.getFormContext();
        let name = formContext.getAttribute("firstname");

        name.setValue("Artem");
    }

    //Demo of methods that have to be faked
    static OpenAlertOnLoad(context: Xrm.Events.EventContext): void {
        let formContext = context.getFormContext();

        Xrm.Navigation.openAlertDialog({ text: `This is alert` });
    }

    //Demo of WebApi methods
    static async GetDataOnLoad(context: Xrm.Events.EventContext) {

        let parentIdAtt = context.getFormContext().getAttribute<Xrm.Attributes.LookupAttribute>("parentcustomerid");
        let parentIdValue = parentIdAtt.getValue();

        if (parentIdValue != null && parentIdValue[0] != null) {

            // try {
            let response = await WebApiClient.Retrieve({
                entityName: "account",
                entityId: parentIdValue[0].id,
                queryParams: "$select=name"
            });

            let nameAtt = context.getFormContext().getAttribute("name");
            nameAtt.setValue(response.name);
            // }
            // catch (error) {
            //     //Xrm.Navigation.openAlertDialog({ text: "Error" });
            //     console.error(error);
            // }

            // Xrm.WebApi.retrieveRecord("account", parentIdValue[0].id, "$select=name").then(
            //     (success) => {
            //         let nameAtt = context.getFormContext().getAttribute("name");
            //         nameAtt.setValue(success.name);
            //      },
            //     (error) => {
            //         Xrm.Navigation.openAlertDialog({ text : "Error" });
            //         console.error(error);
            //     }
            // );
        }
    }
}

// Should be tree shaken
export class Contact {

    static ShouldBeDeleted(): void {

        alert("TADA Fiddler!!!");
    }
}