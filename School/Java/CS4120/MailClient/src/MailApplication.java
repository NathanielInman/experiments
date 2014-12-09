/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package assignment2;

import javax.swing.UIManager;

/**
 *
 * @author NBI08430
 */
public class MailApplication {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        /* Attempt to give the form the Nimbus UI look and feel */
        try {
            UIManager.setLookAndFeel("com.jtattoo.plaf.hifi.HiFiLookAndFeel");
        } catch (ClassNotFoundException | InstantiationException | IllegalAccessException | javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(GUI.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {
                new GUI().setVisible(true);
            }
        });
    }
}
