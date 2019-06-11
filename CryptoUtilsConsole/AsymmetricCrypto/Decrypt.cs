using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CryptoUtilsConsole.AsymmetricCrypto
{
  class Decrypt
  {
    const string fileName = @".\mybyte.lic";
    string privateKey = @".\priv.cert";

    public string readFile()
    {
      byte[] ByteArray = new byte[1];
      if (File.Exists(fileName))
      {
        FileStream fs = new FileStream(fileName, FileMode.Open, FileAccess.Read);
        ByteArray = new byte[System.Convert.ToInt32(fs.Length)];
        fs.Read(ByteArray, 0, System.Convert.ToInt32(fs.Length));
        fs.Close();
      }
      else { Console.WriteLine("Datei nicht gefunden"); }


      return DecryptFile(privateKey, ByteArray);
    }


    private static string DecryptFile(string privateKeyFile, byte[] encrypted)
    {
      byte[] decrypted;
      using (var rsa = new RSACryptoServiceProvider((int)KeySizes.SIZE_2048))
      {
        rsa.PersistKeyInCsp = false;
        string privateKey = File.ReadAllText(privateKeyFile);
        rsa.FromXmlString(privateKey);
        decrypted = rsa.Decrypt(encrypted, true);
      }

      return Encoding.UTF8.GetString(decrypted);
    }

  }
}
