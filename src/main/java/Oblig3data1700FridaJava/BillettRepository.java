package Oblig3data1700FridaJava;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate db;

    private Logger logger = LoggerFactory.getLogger(BillettRepository.class);

    public boolean lagreBillett(Billett3 billetter) {
        String sql = "INSERT INTO Billett(film, antall, fornavn, etternavn, telefon, epost) VALUES (?, ?, ?, ?, ?, ?)";
        db.update(sql, billetter.getFilm(), billetter.getAntall(), billetter.getFornavn(), billetter.getEtternavn(), billetter.getTelefon(), billetter.getEpost());
        return false;
    }

    public List<Billett3> hentAlle() {
        String sql = "SELECT film, antall, fornavn, etternavn, telefon, epost FROM Billett ORDER BY etternavn";
        try {
            List<Billett3> billetter = db.query(sql, new BeanPropertyRowMapper<Billett3>(Billett3.class));
            return billetter;
        } catch (Exception e) {
            logger.error("Kan ikke hente billetter nå " + e);
            return null;
        }
    }

    public boolean slettAlle() {
        String sql = "DELETE FROM Billett;";
        try {
            db.update(sql);
            return true;
        } catch (Exception e) {
            logger.error("Kan ikke slette billetter nå " + e);
            return false;
        }
    }

}
