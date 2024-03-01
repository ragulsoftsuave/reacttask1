export default function Temp(params) {
    return (
    <form action="" method="post">
        <fieldset>
            <legend>Personal Information</legend>
            <label for="name">Full Name:</label>
            <input type="text" id="name" name="name" required/>
            <br/>
            <label for="initial">Initial:</label>
            <input type="text" id="initial" name="initial" maxlength="1"/>
            <br/>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required/>
            <br/>
            <label for="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone"/>
            <br/>
            <label for="address">Address:</label>
            <textarea id="address" name="address" rows="5" required></textarea>
        </fieldset>

        <fieldset>
            <legend>Location</legend>
            <label for="country">Country:</label>
            <select id="country" name="country">
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
            </select>
            <br/>
            <label for="state">State/Province:</label>
            <select id="state" name="state">
                <option value="">Select State/Province</option>
                </select>
            <br/>
            <label for="district">District/City:</label>
            <select id="district" name="district">
                <option value="">Select District/City</option>
                </select>
        </fieldset>

        <fieldset>
            <legend>Login Information</legend>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required/>
            <br/>
            <label for="confirm_password">Confirm Password:</label>
            <input type="password" id="confirm_password" name="confirm_password" required/>
            <br/>
            <span id="password_error" style={{color: "red"}}></span>
        </fieldset>

        <input type="submit" value="Register"/>
    </form>
    );
}