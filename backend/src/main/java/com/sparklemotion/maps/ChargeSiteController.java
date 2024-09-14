package com.sparklemotion.maps;

import com.sparklemotion.maps.model.ChargeSite;
import com.sparklemotion.maps.model.ResponseChargeSite;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chargesites")
@CrossOrigin(origins = {"https://localhost:5173"})
public class ChargeSiteController {

  @Autowired private ChargeSiteService chargeSiteService;

  @GetMapping
  public List<ResponseChargeSite> getChargeSitesInFilteredRegion(
      @RequestParam("lat") double latitude,
      @RequestParam("lon") double longitude,
      @RequestParam("latd") double latitudeDelta,
      @RequestParam("lond") double longitudeDelta,
      // NOTE(Bruce): These three are intentionally big-B Booleans so null checks are trivial.
      @RequestParam(value = "obf", required = false) Boolean obfuscatedStatus,
      @RequestParam(value = "res", required = false) Boolean reservedStatus,
      @RequestParam(value = "pri", required = false) Boolean privateStatus) {
    return ChargeSite.responses(
        chargeSiteService.getChargeSitesInFilteredRegion(
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
            obfuscatedStatus,
            reservedStatus,
            privateStatus));
  }

  @GetMapping("/{id}")
  public ResponseChargeSite getChargeSiteById(@PathVariable Long id) {
    return ChargeSite.response(chargeSiteService.getChargeSiteById(id));
  }

  @PostMapping
  public ResponseEntity<ResponseChargeSite> createChargeSite(@RequestBody ChargeSite chargeSite) {
    chargeSite.generateObfuscation();
    ResponseChargeSite responseChargeSite =
        ChargeSite.response(chargeSiteService.saveChargeSite(chargeSite));
    return new ResponseEntity<>(responseChargeSite, HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public ResponseChargeSite updateChargeSite(
      @PathVariable Long id, @RequestBody ChargeSite chargeSite) {
    chargeSite.setId(id);
    chargeSite.generateObfuscation();
    return ChargeSite.response(chargeSiteService.saveChargeSite(chargeSite));
  }

  @DeleteMapping("/{id}")
  public void deleteChargeSite(@PathVariable Long id) {
    chargeSiteService.deleteChargeSite(id);
  }
}
