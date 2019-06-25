using BraintreeHttp;
using PayPalCheckoutSdk.Core;
using System;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Text;

namespace PayPal
{
    public class PayPalClient
    {
        /**
            Set up PayPal environment with sandbox credentials.
            In production, use LiveEnvironment.
         */
        public static PayPalEnvironment environment()
        {
            return new SandboxEnvironment("AbJXHuVfjGzgwQZYpumYFIz0XyMBqk9z7MqdElTzvYaAXA_PgQ8pKHFAP7dGw_8qI-MotMtIZGdf4ilh",
                                          "ED0ZVylQA1RllCo3quYIE4SYqopNVm3aDu4F1OMYEuiIKHwLVpLS4JhWlJu1esJ6Wvq1jhoMounRnI6e");
        }

        /**
            Returns PayPalHttpClient instance to invoke PayPal APIs.
         */
        public static HttpClient client()
        {
            return new PayPalHttpClient(environment());
        }

        public static HttpClient client(string refreshToken)
        {
            return new PayPalHttpClient(environment(), refreshToken);
        }

        /**
            Use this method to serialize Object to a JSON string.
        */
        public static String ObjectToJSONString(Object serializableObject)
        {
            MemoryStream memoryStream = new MemoryStream();
            var writer = JsonReaderWriterFactory.CreateJsonWriter(
                        memoryStream, Encoding.UTF8, true, true, "  ");
            DataContractJsonSerializer ser = new DataContractJsonSerializer(serializableObject.GetType(),
                                                                            new DataContractJsonSerializerSettings { UseSimpleDictionaryFormat = true });
            ser.WriteObject(writer, serializableObject);
            memoryStream.Position = 0;
            StreamReader sr = new StreamReader(memoryStream);
            return sr.ReadToEnd();
        }
    }
}
