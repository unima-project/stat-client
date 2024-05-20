import {userType} from "../../models";

export default class CorpusConfig {
    constructor(userLevel, columnsConfig) {
        this.userLevel = userLevel;
        this.columns = columnsConfig;
        this.columnsConfig = columnsConfig;
    }

    columnsAdminConfig = () => {
        this.columnsConfig.USER.visible = true
        this.columnsConfig.PUBLIC.visible = true

        this.columns = this.columnsConfig;
        return this
    }

    columnsMemberConfig = () => {
        this.columnsConfig.USER.visible = false
        this.columnsConfig.PUBLIC.visible = true

        this.columns = this.columnsConfig;
        return this
    }

    columnsPublicConfig = () => {
        this.columnsConfig.USER.visible = false
        this.columnsConfig.PUBLIC.visible = false

        this.columns = this.columnsConfig;
        return this
    }

    SetColumns = () => {
        this.columns = this.userLevel === userType.USER_ADMIN
            ? this.columnsAdminConfig().columns : this.userLevel === userType.USER_MEMBER
                ? this.columnsMemberConfig().columns : this.columnsPublicConfig().columns

        return this
    }
}