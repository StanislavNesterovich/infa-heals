<template>
  <el-table
    class="submodules-table"
    ref="submodulesTable"
    :default-sort = "{prop: 'name', order: 'ascending'}"
    :data="platform.submodules"
    :row-class-name="tableRowClassName"
    :height="tableMaxHeight"
    :empty-text="!platform.loaded ? 'Loading...' : 'No submodules'"
    @row-click="handleRowClick"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <template v-if="props.row.tags.length">
          <h5 class="expand-header">Latest versions</h5>
          <p class="version-info"
            v-for="(tag, index) in getFilteredTags(props.row)"
            :class="{ current: tag.tagId === props.row.contentId}"
            :key="tag.tagId">
            <a :href="getUrlToChangelog(props.row, tag)" target="_blank" class="version-number">
              {{tag.tagId}}
            </a>
            <span class="version-date">
              — {{getFormattedDate(tag.timestamp)}}
            </span>
            <span
              v-if="tag.tagId === props.row.contentId && index > 0"
              class="versions-diff">
              | {{index}} version<template v-if="index > 1">s</template> ahead
            </span>
          </p>
        </template>
        <template v-else>
          <p class="no-versions">No versions</p>
        </template>
      </template>
    </el-table-column>
    <el-table-column
      sortable
      prop="name"
      width="250"
      label="Submodule">
      <template slot-scope="scope">
        <a @click.stop :href="scope.row.repositoryUrl" target="_blank">{{scope.row.name}}</a>
      </template>
    </el-table-column>
    <el-table-column
      min-width="350"
      label="Content">
      <template slot-scope="scope">
        <a @click.stop :href="scope.row.browseUrl" target="_blank">
          <i
            class="el-icon-time old-version-icon"
            v-if="showOldVersionIcon(scope.row)"></i>
          {{scope.row.contentId}}
        </a>
      </template>
    </el-table-column>
    <el-table-column
      width="150"
      label="Type">
      <template slot-scope="scope">
        <span @click.stop>{{scope.row.matchingType}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getFormattedDate } from '../utils/date-utils';
import fullscreenTableMixin from '../mixins/fullscreen-table.mixin';

const MAX_VERSIONS_COUNT_IN_EXPAND = 5;

export default {
  name: 'PlatformSubmodulesComponent',
  mixins: [fullscreenTableMixin],
  props: {
    platform: Object,
  },
  methods: {
    tableRowClassName({ row }) {
      switch (row.matchingType) {
        case 'UNDEFINED': return 'danger-row';
        case 'BRANCH': return 'warning-row';
        default: return 'success-row';
      }
    },
    showOldVersionIcon(row) {
      return row.matchingType === 'TAG' && row.tags.length && row.tags[0].tagId !== row.contentId;
    },
    getFilteredTags(row) {
      const currentVersionIndex = row.tags.findIndex(t => t.tagId === row.contentId);

      if (currentVersionIndex < MAX_VERSIONS_COUNT_IN_EXPAND) {
        return row.tags.slice(0, MAX_VERSIONS_COUNT_IN_EXPAND);
      }

      return row.tags.slice(0, currentVersionIndex + 1);
    },
    getUrlToChangelog(row, tag) {
      return `${row.repositoryUrl}/CHANGELOG.md?at=refs/tags/${tag.tagId}`;
    },
    handleRowClick(row) {
      this.$refs.submodulesTable.toggleRowExpansion(row);
    },
    getFormattedDate,
  },
};
</script>
