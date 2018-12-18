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

/**
 * Interface representing the values in the custom_properties.yaml file
 * see example_properties.yaml for descriptions and more details
 */
export interface ITestPropertiesSchema {

    /**
     * Properties related to connecting to IMS
     */
    ims: {
        /**
         * user ID to connect to IMS
         */
        user: string,
        /**
         * Password to connect to IMS
         */
        password: string,
        /**
         * host name for  IMS
         */
        host: string,
        /**
         * Port for IMS
         */
        port?: number
    };

}
