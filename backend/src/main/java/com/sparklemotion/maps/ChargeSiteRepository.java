package com.sparklemotion.maps;

import com.sparklemotion.maps.model.ChargeSite;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChargeSiteRepository extends JpaRepository<ChargeSite, Long> {

  // FIXME(Bruce):
  //  This distance calculation does not take into account
  //  the wrapping coordinates that generateObfuscation does.
  @Query(
      value =
          "SELECT * FROM charge_sites WHERE "
              + "ST_Distance("
              + "POINT(obfuscated_latitude, obfuscated_longitude), "
              + "POINT(?1, ?2)"
              + ") <= (?3 + "
              + ChargeSite.MAX_OBFUSCATED_RADIUS
              + ") "
              + "AND (?4 IS NULL OR obfuscated_status = ?4) "
              + "AND (?5 IS NULL OR reserved_status = ?5) "
              + "AND (?6 IS NULL OR private_status = ?6)",
      nativeQuery = true)
  List<ChargeSite> getFilteredRegion(
      double centerLatitude,
      double centerLongitude,
      double maxDistance,
      Boolean obfuscatedStatus,
      Boolean reservedStatus,
      Boolean privateStatus);
}
