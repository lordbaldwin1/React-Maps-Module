package com.sparklemotion.maps;

import com.sparklemotion.maps.model.ChargeSite;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChargeSiteService {

  @Autowired private ChargeSiteRepository chargeSiteRepository;

  public List<ChargeSite> getAllChargeSites() {
    return chargeSiteRepository.findAll();
  }

  public List<ChargeSite> getChargeSitesInFilteredRegion(
      double latitude,
      double longitude,
      double latitudeDelta,
      double longitudeDelta,
      Boolean obfuscatedStatus,
      Boolean reservedStatus,
      Boolean privateStatus) {
    double maxDistance = calculateMaxDistance(latitudeDelta, longitudeDelta);
    return chargeSiteRepository.getFilteredRegion(
        latitude, longitude, maxDistance, obfuscatedStatus, reservedStatus, privateStatus);
  }

  public ChargeSite getChargeSiteById(Long id) {
    return chargeSiteRepository.findById(id).orElse(null);
  }

  public ChargeSite saveChargeSite(ChargeSite chargeSite) {
    return chargeSiteRepository.save(chargeSite);
  }

  public void deleteChargeSite(Long id) {
    chargeSiteRepository.deleteById(id);
  }

  /**
   * How many times farther than the visible region that charge sites should be fetched. Keep this
   * identical to chargeSiteParamSlice.ts's copy.
   */
  private static final double QUERY_DISTANCE_SCALE = 2.0;

  private double calculateMaxDistance(double latitudeDelta, double longitudeDelta) {
    return QUERY_DISTANCE_SCALE * Math.max(latitudeDelta, longitudeDelta);
  }
}
