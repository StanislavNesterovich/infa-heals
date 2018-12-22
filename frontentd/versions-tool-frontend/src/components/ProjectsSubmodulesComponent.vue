<template>
  <el-table
    class="submodules-table"
    ref="submodulesTable"
    stripe
    :data="platform.submodules"
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
      label="Submodule">
      <template slot-scope="scope">
        <a @click.stop :href="scope.row.repositoryUrl" target="_blank">
          {{scope.row.name}}
          <span v-if="scope.row.tags.length">({{scope.row.tags[0].tagId}})</span>
        </a>
      </template>
    </el-table-column>
    <el-table-column
      v-for="(project, index) in platform.projects"
      :key="project.id"
      :label="project.name">
      <template slot-scope="scope">
        <a
          v-if="scope.row.projects[index]"
          @click.stop
          :href="scope.row.projects[index].browseUrl"
          target="_blank">
          {{scope.row.projects[index].contentId}}
        </a>
        <span v-else @click.stop>—</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getFormattedDate } from '../utils/date-utils';
import fullscreenTableMixin from '../mixins/fullscreen-table.mixin';

const MAX_VERSIONS_COUNT_IN_EXPAND = 5;

export default {
  name: 'ProjectsSubmodulesComponent',
  mixins: [fullscreenTableMixin],
  props: {
    platform: Object,
  },
  methods: {
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
