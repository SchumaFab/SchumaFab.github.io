using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace CryptoUtilsConsole.AsymmetricCrypto
{
  public enum KeySizes
  {
    SIZE_512 = 512,
    SIZE_1024 = 1024,
    SIZE_2048 = 2048,
    SIZE_952 = 952,
    SIZE_1369 = 1369
  };

  class RsaFileDemo
  {
    const string fileName = @".\mybyte.lic";

    public static void LaunchDemo()
    {
      string message = "Mein Name ist Fabian!";
      string publicKey = "./pub.cert";
      //GenerateKeys(publicKey, privateKey);

      byte[] encrypted = Encrypt(publicKey, Encoding.UTF8.GetBytes(message));

      using (FileStream
     fileStream = new FileStream(fileName, FileMode.Create))
      {
        // Write the data to the file, byte by byte.
        for (int i = 0; i < encrypted.Length; i++)
        {
          fileStream.WriteByte(encrypted[i]);
        }

        // Set the stream position to the beginning of the file.
        fileStream.Seek(0, SeekOrigin.Begin);
      }


      Decrypt myDec = new Decrypt();
      string decrypted = myDec.readFile();

      Console.WriteLine("Original\n\t " + message + "\n");
      Console.WriteLine("Encrypted\n\t" + BitConverter.ToString(encrypted).Replace("-", "") + "\n");
      Console.WriteLine("Decrypted\n\t" + decrypted);

      Console.ReadLine();
    }

    private static void GenerateKeys(string publicKeyFile, string privateKeyFile)
    {
      using (var rsa = new RSACryptoServiceProvider((int)KeySizes.SIZE_2048))
      {
        rsa.PersistKeyInCsp = false;

        if (File.Exists(privateKeyFile))
          File.Delete(privateKeyFile);

        if (File.Exists(publicKeyFile))
          File.Delete(publicKeyFile);

        string publicKey = rsa.ToXmlString(false);
        File.WriteAllText(publicKeyFile, publicKey);
        string privateKey = rsa.ToXmlString(true);
        File.WriteAllText(privateKeyFile, privateKey);
      }
    }

    private static byte[] Encrypt(string publicKeyFile, byte[] plain)
    {
      byte[] encrypted;
      using (var rsa = new RSACryptoServiceProvider((int)KeySizes.SIZE_2048))
      {
        rsa.PersistKeyInCsp = false;
        string publicKey = File.ReadAllText(publicKeyFile);
        rsa.FromXmlString(publicKey);
        encrypted = rsa.Encrypt(plain, true);
      }

      return encrypted;
    }
  }
}