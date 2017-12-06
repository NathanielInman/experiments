/*
 * Homework 4 - Computer Security - UCMO - Spring 2014
 * 
 * Write a Java program to use your own RSA algorithm to do encyrpt/decrypt with one classmate.
 * 
 * To begin you will need to exchange public key with your peer, and also provide an encrypted 
 * message to your peer. Next you will need to write a Java program tha tperforms the following steps:
 * 
 * 1. Generate a RSA-1024 key pair using your own RSA. 
 *      We'll call them YourPrivKey and YourPublicKey. You need to save your key pair for later
 *      usage as you may use random number to generate them.
 * 2. Retrieves your peer's public key. (We'll call this PeerPublicKey.)
 * 3. Create some String message or an integer that you wish to encrypt.
 *      We'll call this plainTextMsg. Encrypt the message with YourPrivKey and
 *      PeerPublicKey, and provide the encrypted message to your peer.
 *      We'll call it PeerPlainTextMsg.
 * 5. Output the following information:
 *      Name of your peer
 *      Your Public Key
 *      Peer Public Key
 *      Peer Cipher Text Message
 *      Peer Plaintext Message
 * 6. Eventually, submit your program and output at Blackboard.
 */
package rsaencryption;

/**
 *
 * @author Nate
 */
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Scanner;
public class RSAEncryption {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws UnsupportedEncodingException {
        BigInteger p,q,d,e,m,msg,privateKey,publicKey;
        SecureRandom r = new SecureRandom();
        p=BigInteger.probablePrime(512,r);
        System.out.println("Your Private Key: "+p);
        q=BigInteger.probablePrime(512,r);
        System.out.println("Your Public Key: "+q);
        m=p.multiply(q);
        Scanner s = new Scanner(System.in);
        System.out.print("Enter Peer Public Key (or <enter> to generate one): ");
        String peerKey=s.nextLine();peerKey.trim();
        if(peerKey.length()==0){ //it's required to have a peer key
            peerKey="65537"; //we need an input no matter what, so handle if they skip
        } //end if
        publicKey=new BigInteger(peerKey);
        try{
            privateKey=publicKey.modInverse(p.subtract(new BigInteger("1")).multiply(q.subtract(new BigInteger("1"))));
        }catch(java.lang.ArithmeticException numberNotPrime){
        }finally{ //wasn't an acceptable key, we'll use one that works
            publicKey=new BigInteger("65537");
            privateKey=publicKey.modInverse(p.subtract(new BigInteger("1")).multiply(q.subtract(new BigInteger("1"))));
        } //end try
        System.out.print("Enter plain text message (or <enter> to use 'Hello World'): ");
        String nput=s.nextLine();nput.trim();
        if(nput.length()==0){
            nput="Hello World"; //we need an input no matter what, so handle if they skip
        } //end if
        byte[] bytes=nput.getBytes();
        msg = new BigInteger(bytes);
        e=msg.modPow(publicKey,m);
        System.out.println("Cipher Text Message: "+e);
        d=e.modPow(privateKey,m);
        bytes=d.toByteArray();
        nput=new String(bytes,"UTF-8");
        System.out.println("Plaintext Message: "+nput);
    }
}
