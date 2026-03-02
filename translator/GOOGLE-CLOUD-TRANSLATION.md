To create `GOOGLE_APPLICATION_CREDENTIALS` for the Google Cloud Translation API, follow these steps:

1. **Create a Google Cloud Project**: Log in to the Google Cloud Console at [console.cloud.google.com](https://console.cloud.google.com). Click on the project dropdown at the top of the page and select **New Project**. Fill in the project details and click **Create**.

2. **Enable the Cloud Translation API**: Navigate to the **APIs & Services** section in the left sidebar. Click on **Library**, search for **Cloud Translation API**, and click **Enable** to activate the API for your project [^1].

3. **Create a Service Account**:
    - Go to **IAM & Admin** > **Service Accounts** in the left sidebar.
    - Click on **+ CREATE SERVICE ACCOUNT** at the top.
    - Enter a name and description for the service account, then click **CREATE AND CONTINUE**.
    - Assign the necessary roles (e.g., **Cloud Translation API User**) to the service account, and click **DONE**.

4. **Generate a JSON Key**:
    - In the Service Accounts page, find the service account you just created.
    - Click on the three vertical dots on the right and select **Manage keys**.
    - Click on **ADD KEY** and choose **Create new key**.
    - Select **JSON** as the key type and click **CREATE**. This will download a JSON file containing your credentials [^2].

5. **Set the Environment Variable**: To use the credentials in your application, set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the path of the downloaded JSON key file. You can do this in your terminal or command prompt:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/credentials.json"
   ```
   Replace `/path/to/your/credentials.json` with the actual path to your JSON key file [^3].

By following these steps, you will have created the necessary credentials to authenticate your application with the Google Cloud Translation API.

[^1]: https://docs.cloud.google.com/translate/docs/setup
[^2]: https://prestahero.com/es/help-center/configuration/338-configure-google-cloud-translation-api-v3-json-key
[^3]: https://docs.cloud.google.com/translate/docs/authentication

