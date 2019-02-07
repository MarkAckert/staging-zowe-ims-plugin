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

import { AbstractSession, ImperativeError, ImperativeExpect, Logger } from "@brightside/imperative";
import { ImsRestClient } from "../../rest";
import { IIMSApiResponse, IUpdateProgramParms, IUpdateTransactionParms } from "../../doc";
import { IStopRegionParms } from "../../doc/IStopRegionParms";
import { ImsConstants } from "../../constants";

// TODO update to work with IMS REST API
/**
 * Stop program in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IUpdateProgramParms} parms - parameters for stopping a program
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS program name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function stopProgram(session: AbstractSession, parms: IUpdateProgramParms): Promise<IIMSApiResponse> {

    if (parms.names === undefined) {
        throw new ImperativeError({msg: "Expect Error: IMS program name is required"});
    }

    ImperativeExpect.toBeDefinedAndNonBlank(parms.names[0], "IMS Program name", "IMS program name is required");

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to stop programs(s) with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsConstants.URL + ImsConstants.PROGRAM;

    // names is required
    if (parms.names.length > 0) {
        // 'names' text must be lower case
        resource = resource + delimiter + "names=";
        for (let i = 0; i < parms.names.length; i++) {
            if (i === 0) {
                resource = resource + encodeURIComponent(parms.names[i]);
            } else {
                resource = resource + "," + encodeURIComponent(parms.names[i]);
            }
        }
        delimiter = "&";
    }

    if (parms.stop !== undefined) {
        // 'names' text must be lower case
        resource = resource + delimiter + "stop=";
        for (let i = 0; i < parms.stop.length; i++) {
            if (i === 0) {
                resource = resource + encodeURIComponent(parms.stop[i]);
            } else {
                resource = resource + "," + encodeURIComponent(parms.stop[i]);
            }
        }
        // delimiter = "&";
    }
    else {
        resource += delimiter + "stop=SCHD";
    }

    return ImsRestClient.putExpectJSON(session, resource, [], undefined);
}

/**
 * Stop transaction in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IUpdateTransactionParms} parms - parameters for stopping a transaction
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS program name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function stopTransaction(session: AbstractSession, parms: IUpdateTransactionParms): Promise<IIMSApiResponse> {

    if (parms.names === undefined) {
        throw new ImperativeError({msg: "Expect Error: IMS transaction name is required"});
    }

    ImperativeExpect.toBeDefinedAndNonBlank(parms.names[0], "IMS Transaction name", "IMS transaction name is required");

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to stop transactions(s) with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsConstants.URL + ImsConstants.TRANSACTION;

    // names is required
    if (parms.names.length > 0) {
        // 'names' text must be lower case
        resource = resource + delimiter + "names=";
        for (let i = 0; i < parms.names.length; i++) {
            if (i === 0) {
                resource = resource + encodeURIComponent(parms.names[i]);
            } else {
                resource = resource + "," + encodeURIComponent(parms.names[i]);
            }
        }
        delimiter = "&";
    }

    if (parms.stop !== undefined) {
        // 'names' text must be lower case
        resource = resource + delimiter + "stop=";
        for (let i = 0; i < parms.stop.length; i++) {
            if (i === 0) {
                resource = resource + encodeURIComponent(parms.stop[i]);
            } else {
                resource = resource + "," + encodeURIComponent(parms.stop[i]);
            }
        }
        // delimiter = "&";
    }
    else {
        resource += delimiter + "stop=SCHD";
    }

    return ImsRestClient.putExpectJSON(session, resource, [], undefined);
}

/**
 * Stop region in IMS through REST API
 * @param {AbstractSession} session - the session to connect to IMS with
 * @param {IStopRegionParms} parms - parameters for stopping the region
 * @returns {Promise<IIMSApiResponse>} promise that resolves to the response (XML parsed into a javascript object)
 *                          when the request is complete
 * @throws {ImperativeError} IMS program name not defined or blank
 * @throws {ImperativeError} ImsRestClient request fails
 */
export async function stopRegion(session: AbstractSession, parms: IStopRegionParms): Promise<IIMSApiResponse> {
    ImperativeExpect.toBeEqual(parms.regNum == null && parms.jobName == null, false,
        "Either region number or job name (but not both) must be specified.");

    ImperativeExpect.toBeEqual(parms.regNum != null && parms.jobName != null, false,
        "Either region number or job name (but not both) must be specified.");

    if (parms.regNum === undefined) {
        ImperativeExpect.toBeDefinedAndNonBlank(parms.jobName,"If job name is specified it must have a value.");
    }

    let delimiter = "?"; // initial delimiter

    Logger.getAppLogger().debug("Attempting to stop a region with the following parameters:\n%s", JSON.stringify(parms));

    let resource = ImsConstants.URL + ImsConstants.REGION + "/" + ImsConstants.STOP;

    if (parms.regNum != null) {
        resource = resource + delimiter + "regNum=" + encodeURIComponent(parms.regNum.join(","));
        delimiter = "&";
    }
    if (parms.jobName != null) {
        resource = resource + delimiter + "jobname=" + encodeURIComponent(parms.jobName);
        delimiter = "&";
    }
    if (parms.abdump != null) {
        resource = resource + delimiter + "abdump=" + encodeURIComponent(parms.abdump);
        delimiter = "&";
    }
    if (parms.transaction != null) {
        resource = resource + delimiter + "transaction=" + encodeURIComponent(parms.transaction);
        delimiter = "&";
    }
    if (parms.cancel != null) {
        resource = resource + delimiter + "cancel=" + encodeURIComponent(parms.cancel + "");
    }
    return ImsRestClient.putExpectJSON(session, resource, [], undefined);
}
