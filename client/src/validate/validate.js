const validate = {
    validateUserName(value) {
        const arr = [];
        for (let i = 0; i < this.users.length; i++) {
            arr.push(this.users[i].userName)
            arr.forEach((item) => {
                if (value == item) {
                    this.v$.userName.$errors[0].$message = `User Name ${this.userName} is already`
                } else {
                    return true
                }
            })
        }
        return true
    },

    verifyStartDate(value) {
        if (value >= String(new Date().toISOString()))  {
            return true
        } else {
            this.v$.startDate.$errors[0].$message = `Error: StartDate must be greater than today`
        }
    },
    
    verifyEndDate(value) {
        if (value >= String(new Date(this.startDate).toISOString())) {
            return true
        } else {
            this.v$.endDate.$errors[0].$message = `Error: EndDate must be greater than StartDate`
        }
    }
}


export default validate;
