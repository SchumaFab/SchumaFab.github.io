using CryptoUtilsConsole.AsymmetricCrypto;

namespace CryptoUtilsConsole
{
  public enum CryptoOperation
  {
    ENCRYPT,
    DECRYPT
  };

  class Program
  {
    static void Main(string[] args)
    {
      RsaFileDemo.LaunchDemo();
    }
  }
}