/*
* This program and the accompanying materials are made available under the terms of the *
* Eclipse Public License v2.0 which accompanies this distribution, and is available at *
* https://www.eclipse.org/legal/epl-v20.html                                      *
*                                                                                 *
* SPDX-License-Identifier: EPL-2.0                                                *
*                                                                                 *
* Copyright Contributors to the Zowe Project.                                     *
*                                                                                 *
*/

import { ICommandHandler, IHandlerParameters, IProfile, ITaskWithStatus, Logger, TaskStage, TextUtils } from "@brightside/imperative";
import { IIMSApiResponse, ImsSession, startProgram } from "../../../api";
import { ImsBaseHandler } from "../../ImsBaseHandler";

import i18nTypings from "../../-strings-/en";

// Does not use the import in anticipation of some internationalization work to be done later.
const strings = (require("../../-strings-/en").default as typeof i18nTypings).START.RESOURCES.PROGRAM;

/**
 * Command handler for starting IMS programs
 * @export
 * @class ProgramHandler
 * @implements {ICommandHandler}
 */
export default class ProgramHandler extends ImsBaseHandler {
    public async processWithSession(params: IHandlerParameters,
                                    session: ImsSession,
                                    profile: IProfile): Promise<IIMSApiResponse> {

        const status: ITaskWithStatus = {
            statusMessage: "Start program defined to IMS",
            percentComplete: 0,
            stageName: TaskStage.IN_PROGRESS
        };
        params.response.progress.startBar({task: status});

        const response = await startProgram(session, {
            names: params.arguments.names,
            start: params.arguments.attributes,
            route: params.arguments.route
        });

        this.checkReturnCode(response);

        params.response.console.log(TextUtils.prettyJson(response.data));

        Logger.getAppLogger().info("Messages from the start program API:\n" + JSON.stringify(response.messages, null, 2));
        return response;

    }
}
